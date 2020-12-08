import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks");
    setTasks(result.data);
  };

  const deleteTask = async id => {
    await axios.delete(`https://handoverapp.herokuapp.com/api/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Today's tasks</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">Grade required</th>
              <th scope="col">MRN</th>
              <th scope="col">Location</th>
              <th scope="col">More...</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <th scope="row">{index + 1}</th>
                <td>{task.description}</td>
                <td>{task.gradeRequired}</td>
                <td>{task.patientMrn}</td>
                <td>{task.patientLocation}</td>
                <td>
                  <Link className="btn btn-primary mr-2" to={{pathname: `/tasks/${task.id}`, selectedTask: task}}>View / Edit</Link>
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}