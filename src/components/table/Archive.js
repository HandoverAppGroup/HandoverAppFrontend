import React, { useState, useEffect } from "react";
import axios from "axios";
import ArchiveTable from './ArchiveTable';
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

export default function Archive() {
  
  const [tasks, setTasks] = useState([]);
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());
  // Can be 1 or 2 
  const [queryType, setQueryType] = useState(-1);
  // Used for searching by MRN
  const [query, setQuery] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks");
    setTasks(result.data);
  };

  const loadFilteredTasks = async () => {
    var link = "";
    if (queryType==="1" && query) {
      link="https://handoverapp.herokuapp.com/api/tasks/byPatient?mrn="+query;
      const result = await axios.get(link);
      setTasks(result.data);
    }
    if (queryType==="2") {
      var startdate=moment(startDate).format('YYYY-MM-DD')+"-12-00";
      var enddate=moment(endDate).format('YYYY-MM-DD')+"-12-00";
      link="https://handoverapp.herokuapp.com/api/tasks/byDate?earliestDate="+startdate+"&latestDate="+enddate;
      const result = await axios.get(link);
      setTasks(result.data);
    }
  }

  return (
    <div className="container">
      <h1>Archive</h1>
      <DropdownButton id="dropdown-item-button" title="Filter" onSelect={(e) => setQueryType(e)}>
        <Dropdown.Item eventKey="1">By MRN</Dropdown.Item>
        <Dropdown.Item eventKey="2">By date</Dropdown.Item>
      </DropdownButton>
      <form>
        <input
          value={query}
          type="text"
          name="query"
          placeholder="Your query"
          onChange={(e) => {setQuery(e.target.value)}}
        />
      </form>
      <p>Start Date <b>{moment(startDate).format('YYYY-MM-DD')}</b></p>
      <Calendar
        value={startDate}
        onChange={setStartDate}
      />
      <p>End Date <b>{moment(endDate).format('YYYY-MM-DD')}</b></p>
      <Calendar
        value={endDate}
        onChange={setEndDate}
      />
      <Button variant="danger" onClick={loadFilteredTasks}>Search</Button>
      <ArchiveTable tasks={tasks} header={"Banana"}/>
    </div>
  )
}