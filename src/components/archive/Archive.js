import React, { useState, useEffect } from "react";
import axios from "axios";
import ArchiveTable from './ArchiveTable';
import DatesPicker from './DatesPicker';
import MrnPicker from './MrnPicker';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'
import { Button } from "react-bootstrap";

export default function Archive() {

  const [tasks, setTasks] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // Valid query types are "1" or "2" at the moment
  const [queryType, setQueryType] = useState(-1);
  // Used for searching by MRN
  const [query, setQuery] = useState("");

  // Load all tasks (API automatically only sends last 30) at the beginning
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks");
    setTasks(result.data);
  };

  const loadUncompletedTasks = async () => {
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks/uncompleted");
    setTasks(result.data);
  };

  const resetFilter = async () => {
    setQueryType(-1);
    loadTasks();
  };

  // Function to load tasks from different urls depending on what filter was chosen
  // This function on deals with cases when the filter needs additional user input, such as an MRN
  const loadFilteredTasks = async () => {
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
  }

  // This does not need additional user input so can be run as en effect (automatically as soon as the filter type is set)
  useEffect(() => {
    if (queryType === "3") {
      loadUncompletedTasks();
    }
  }, [queryType])

  return (
    <div className="container-fluid">
      <div className="col">
        <h1 className="py-2" className="align2">Archive</h1>
        <div className="row">
          <DropdownButton id="dropdown-item-button" title="Filter" className="mr-2" onSelect={(e) => setQueryType(e)}>
            <Dropdown.Item eventKey="1">By MRN</Dropdown.Item>
            <Dropdown.Item eventKey="2">By date</Dropdown.Item>
            <Dropdown.Item eventKey="3">By uncompleted</Dropdown.Item>
          </DropdownButton>
          <Button onClick={resetFilter}>Reset Filter</Button>
        </div>
      </div>
      { queryType === "1" ? <MrnPicker query={query} onQueryChange={(e) => { setQuery(e.target.value) }} onSubmit={loadFilteredTasks} /> : null}
      { queryType === "2" ? <DatesPicker startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} onSubmit={loadFilteredTasks} /> : null}
      <ArchiveTable tasks={tasks} />
    </div>
  )
}