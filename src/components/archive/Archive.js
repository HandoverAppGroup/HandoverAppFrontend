import React, { useState, useEffect } from "react";
import DatesPicker from './DatesPicker';
import MrnPicker from './MrnPicker';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import TaskTable from '../base/TaskTable';
import moment from 'moment';
import { Button } from "react-bootstrap";

export default function Archive() {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [queryType, setQueryType] = useState(-1);
  const [query, setQuery] = useState("");

  // Api endpoint to load tasks. It is updated with the filter parameters.
  const [apiEndpoint, setApiEndpont] = useState("/api/tasks");

  const resetFilter = (e) => {
    e.preventDefault();
    setQueryType(-1);
    setApiEndpont("/api/tasks");
  };

  // Automatically update endpoint if filtering by uncompleted
  useEffect(() => {
    if (queryType === "3") {
      setApiEndpont("/api/tasks/uncompleted");
    }
  }, [queryType])


  // Query types and corresponding filters:
  // 1- patient MRN
  // 2- date
  // 3- uncompleted
  const updateEndpoint = () => {
    switch (queryType) {
      case "1":
        setApiEndpont("/api/tasks/byPatient?mrn=" + query);
        break
      case "2":
        var startdate = moment(startDate).format('YYYY-MM-DD') + "-12-00";
        var enddate = moment(endDate).format('YYYY-MM-DD') + "-12-00";
        setApiEndpont("/api/tasks/byDate?earliestDate=" + startdate + "&latestDate=" + enddate);
        break
      default:
        break
    }
  }

  // Archive page with task table and dropdown button for different filter types
  return (
    <TaskTable assignable={false} endpoint={apiEndpoint} title={"Archive"} showCompleter={true}>
      <DropdownButton id="dropdown-item-button" title="Filter" className="inline" onSelect={(e) => setQueryType(e)}>
        <Dropdown.Item eventKey="1">By MRN</Dropdown.Item>
        <Dropdown.Item eventKey="2">By date</Dropdown.Item>
        <Dropdown.Item eventKey="3">By uncompleted</Dropdown.Item>
      </DropdownButton>
      <Button onClick={resetFilter} className="inline-control">Reset Filter</Button>
      {queryType === "1" ? <MrnPicker query={query} onQueryChange={(e) => { setQuery(e.target.value) }} onSubmit={updateEndpoint} /> : null}
      {queryType === "2" ? <DatesPicker startDate={startDate} endDate={endDate} onStartDateChange={setStartDate} onEndDateChange={setEndDate} onSubmit={updateEndpoint} /> : null}
    </TaskTable>
  )
}