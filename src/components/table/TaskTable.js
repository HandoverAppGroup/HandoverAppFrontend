import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks/today");
    setTasks(result.data);
  };

  return (
    <div className="container-fluid">
      <div className="py-4 table-responsive">
        <h1 className="align"> Today's tasks</h1>
        <table className="table border shadow" >
          <thead className="thead-dark" className="header-table">
            <tr>
              <th scope="col" style={{color: 'SlateGrey'}}>#</th>
              <th scope="col" style={{color: 'SlateGrey'}}>DATE CREATED</th>
              <th scope="col" style={{color: 'SlateGrey'}}>GRADE REQUIRED</th>
              <th scope="col" style={{color: 'SlateGrey'}}>DESCRIPTION</th>
              <th scope="col" style={{color: 'SlateGrey'}}>MRN</th>
              <th scope="col" style={{color: 'SlateGrey'}}>LOCATION</th>
              <th scope="col" style={{color: 'SlateGrey'}}>STATUS</th>
              <th scope="col" style={{color: 'SlateGrey'}}>COMPLETED BY</th>
              <th scope="col" style={{color: 'SlateGrey'}}>MORE...</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <th scope="row">{index + 1}</th>
                <td>{task.dateCreated}</td>
                <td>{task.description}</td>
                <td>{task.gradeRequired}</td>
                <td>{task.patientMrn}</td>
                <td>{task.patientLocation}</td>
                <td>{task.completed ? "Completed":"Pending..."}</td>
                <td>{task.completer ? task.completer.name:"TBD"}</td>
                <td>
                  <Link className="btn btn-info mr-2" to={{pathname: `/tasks/${task.id}`, selectedTask: task}}>View / Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}