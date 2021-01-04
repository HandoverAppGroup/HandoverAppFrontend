import React, { useState, useEffect } from "react";
import axios from "axios";
import ArchiveTable from './ArchiveTable';
import DatesPicker from './DatesPicker';
import MrnPicker from './MrnPicker';
import CompleteTaskPopup from '../forms/CompleteTaskPopup';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { Button } from "react-bootstrap";
import { CSVLink } from 'react-csv';

export default function Archive() {

  const [tasks, setTasks] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // Valid query types are "1" or "2" at the moment
  const [queryType, setQueryType] = useState(-1);
  // Used for searching by MRN
  const [query, setQuery] = useState("");
  // Used for marking a task as complete
  const [showCompleteTaskPopup, setShowCompleteTaskPopup] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);
  // Data that is exported when export button pressed
  const [CSVdata, setCSVdata] = useState('');

  // Load all tasks (API automatically only sends last 30) at the beginning
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoaded(false);
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks");
    setTasks(result.data);
    setLoaded(true);
  };

  const loadUncompletedTasks = async () => {
    setLoaded(false);
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks/uncompleted");
    setTasks(result.data);
    setLoaded(true);
  };

  const resetFilter = async () => {
    setQueryType(-1);
    loadTasks();
  };

  // Function to load tasks from different urls depending on what filter was chosen
  // This function on deals with cases when the filter needs additional user input, such as an MRN
  const loadFilteredTasks = async () => {
    setLoaded(false);
    var link = "";
    if (queryType === "1" && query) {
      link = "https://handoverapp.herokuapp.com/api/tasks/byPatient?mrn=" + query;
      const result = await axios.get(link);
      setTasks(result.data);
    }
    if (queryType === "2") {
      var startdate = moment(startDate).format('YYYY-MM-DD') + "-12-00";
      var enddate = moment(endDate).format('YYYY-MM-DD') + "-12-00";
      link = "https://handoverapp.herokuapp.com/api/tasks/byDate?earliestDate=" + startdate + "&latestDate=" + enddate;
      const result = await axios.get(link);
      setTasks(result.data);
    }
    setLoaded(true);
  }

  // Marking tasks as complete from Archive table

  const completeTask = (task) => {
    setShowCompleteTaskPopup(true);
    setTaskToComplete(task);
  }

  const onCompleteTaskPopupHide = () => {
    // Reload the tasks to show updated data
    setShowCompleteTaskPopup(false);
    setTaskToComplete(null);
  }

  // This does not need additional user input so can be run as en effect (automatically as soon as the filter type is set)
  useEffect(() => {
    if (queryType === "3") {
      loadUncompletedTasks();
    }
  }, [queryType])

  function formatTaskForCSV(task) {
    let dcre = moment(task.dateCreated).format('LLL');
    let dcom = task.dateCompleted ? moment(task.dateCompleted).format('LLL') : "";
    let creName = task.creator?.name ?? ""
    let creGrade = task.creator?.grade ?? ""
    let compName = task.completer?.name ?? ""
    let compGrade = task.completer?.grade ?? ""
    let status = task.completed ? "Completed" : "Uncompleted"
    return {
      status: status,
      date_created: dcre,
      date_completed: dcom,
      description: task.description,
      grade_required: task.gradeRequired,
      patient_mrn: task.patientMrn,
      patient_clinical_summary: task.patientClinicalSummary,
      patient_location: task.patientLocation,
      creator_name: creName,
      creator_grade: creGrade,
      completer_name: compName,
      completer_grade: compGrade
    }
  }

  // Set the CSV data every time the filter is changed
  useEffect(() => {
    setCSVdata(tasks.map(t => formatTaskForCSV(t)));
  }, [tasks])

  return (
    <div className="container-fluid">
      { loaded ?
        <div>
          <CompleteTaskPopup
            show={showCompleteTaskPopup}
            selectedTask={taskToComplete}
            onDataChange={loadTasks}
            onHide={onCompleteTaskPopupHide}
          />
          <div className="col">
            <h1 className="py-2 align2">Archive</h1>
            <div className="row">
              <DropdownButton id="dropdown-item-button" title="Filter" className="mr-2" onSelect={(e) => setQueryType(e)}>
                <Dropdown.Item eventKey="1">By MRN</Dropdown.Item>
                <Dropdown.Item eventKey="2">By date</Dropdown.Item>
                <Dropdown.Item eventKey="3">By uncompleted</Dropdown.Item>
              </DropdownButton>
              <Button onClick={resetFilter}>Reset Filter</Button> &nbsp;&nbsp;
              <CSVLink data={CSVdata} filename={"tasks.csv"} className="btn btn-primary"> Export all as CSV </CSVLink>
            </div>
          </div>
          {queryType === "1" ? <MrnPicker query={query} onQueryChange={(e) => { setQuery(e.target.value) }} onSubmit={loadFilteredTasks} /> : null}
          {queryType === "2" ? <DatesPicker startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} onSubmit={loadFilteredTasks} /> : null}
          <ArchiveTable tasks={tasks} onCompleteTask={completeTask} />
        </div>
        : <h1 className="pt-3">Loading...</h1>}
    </div>
  )
}