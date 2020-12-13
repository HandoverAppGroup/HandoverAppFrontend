import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//retrive task by id, date and mrn
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
        <h1>Today's tasks</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date Created</th>
              <th scope="col">Description</th>
              <th scope="col">Grade required</th>
              <th scope="col">MRN</th>
              <th scope="col">Location</th>
              <th scope="col">Status</th>
              <th scope="col">Task Completer</th>
              <th scope="col">More...</th>
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
                  <Link className="btn btn-primary mr-2" to={{pathname: `/tasks/${task.id}`, selectedTask: task}}>View / Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}