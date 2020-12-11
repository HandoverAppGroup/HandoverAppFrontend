import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import moment from 'moment'

export default function Archive(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks/byPatient?mrn=MRN");
    setTasks(result.data);
  };

  const showBy = async (type, value) => {
  //retrieve task by mrn
  if (type===1) {
    var link="https://handoverapp.herokuapp.com/api/tasks/byPatient?mrn="+value;
    const result = await axios.get(link);
    setTasks(result.data);
  }
  //retrieve task by date range
  if (type===2) {
      var startdate=value[0];
      var enddate=value[1];
      var link="https://handoverapp.herokuapp.com/api/tasks/byDate?earliestDate="+startdate+"&latestDate="+enddate;
      const result = await axios.get(link);
      setTasks(result.data);
    }
  //retrieve task by id
  if (type===3) {
      var link="https://handoverapp.herokuapp.com/api/tasks/"+value;
      const result = await axios.get(link);
      setTasks(result.data);
    }
  }

  const[input,setInput] = useState();
  const[criteria,setCriteria] = useState();
  const [dateState,setDateState] = useState(new Date())

  const handleDropdownChange = e =>{
    setInput(e.target.value);
  }
  const handlecritera = e =>{
    setCriteria(e.target.value);
  }

  const changeDate = (e) => {
    setDateState(e)
  }

  const deleteTask = async id => {
    await axios.delete(`https://handoverapp.herokuapp.com/api/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="container">
      <div>
      <h1>Archive</h1>
        <select name="dropdown" onChange={handleDropdownChange}>
                            <option value="1">MRN</option>
                            <option value="2">Date range</option>
                            <option value="3">Patient id</option>
        {console.log(input)}
        </select>
        </div>

    <div>
      <form>
            <input
              type="text"
              name="critera"
              placeholder="What youre searching for"
              onChange={e=>handlecritera(e)}
            />
          </form>
      {console.log(criteria)}

      <Calendar
        value={dateState}
        onChange={changeDate}
      />
      <p>Current selected date is <b>{moment(dateState).format('YYYY-MM-DD')}</b></p>

      <Button variant="danger" onClick={() => showBy(1,'MRN')}>Search</Button>
      <Button variant="danger" onClick={() => showBy(input,criteria)}>Search</Button>
    </div>
    <p> can someone help me 1. conditionally rendering a text box or calender depending on whether search for MRN/id/date</p>
    <p>2.display the result of search. It worked before but now it's broken:[</p>
    </div>
  );
}