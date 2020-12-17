import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment'

//retrive task by id, date and mrn
export default function TaskTable(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks/recent");
    setTasks(result.data);
  };

  const [plannedCompleter, setPlannedCompleter] = useState (Object.assign({}, props?.location?.selectedTask?.plannedCompleter ?? {
    name: "",
    grade: ""
  }));

  const onPlannedCompleterInfoChange = e => {
    setPlannedCompleter({ ...plannedCompleter, [e.target.name]: e.target.value });
  }

  return (
    <div className="container-fluid">
      <div className="py-4 table-responsive">
        <h1 className="align"> Recent tasks</h1>
        <table className="table border shadow" >
          <thead className="thead-dark header-table">
            <tr>
              <th scope="col" style={{color: 'White'}}>#</th>
              <th scope="col" style={{color: 'White'}}>DATE CREATED</th>
              <th scope="col" style={{color: 'White'}}>MRN</th>
              <th scope="col" style={{color: 'White'}}>LOCATION</th>
              <th scope="col" style={{color: 'White'}}>DESCRIPTION</th>
              <th scope="col" style={{color: 'White'}}>GRADE REQUIRED</th>
              <th scope="col" style={{color: 'White'}}>ASSIGNED TO</th>
              <th scope="col" style={{color: 'White'}}>STATUS</th>
              <th scope="col" style={{color: 'White'}}>MORE...</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <th scope="row">{index + 1}</th>
                <td>{moment(task.dateCreated).format('LLL')}</td>
                <td>{task.patientMrn}</td>
                <td>{task.patientLocation}</td>
                <td>{task.description}</td>
                <td>{task.gradeRequired}</td>
                <td> <input
                    type="text"
                    className="form-control form-control-lg"
                    name="name"
                    value={plannedCompleter.name}
                    onChange={e => onPlannedCompleterInfoChange(e)}
                /></td>
                {!task.completer && (
                    <td style={{backgroundColor: '#e17055'}}>Pending...</td>
                )}
                {task.completer && (
                    <td style={{backgroundColor: '#55efc4'}}>Completed</td>
                )}
                <td>
                  <Link className="btn btn-info mr-2" to={{pathname: `/tasks/${task.id}`, selectedTask: task}}>View/Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}