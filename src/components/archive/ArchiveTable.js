import React from "react";
import { Link } from "react-router-dom";

// A table that takes tasks in its props and renders them in a table - no state / effects
export default function ArchiveTable(props) {

  return (
    <div className="py-4 table-responsive">
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
          {props.tasks.map((task, index) => (
            <tr key={task.id}>
              <th scope="row">{index + 1}</th>
              <td>{task.dateCreated}</td>
              <td>{task.description}</td>
              <td>{task.gradeRequired}</td>
              <td>{task.patientMrn}</td>
              <td>{task.patientLocation}</td>
              <td>{task.completed ? "Completed" : "Pending..."}</td>
              <td>{task.completer ? task.completer.name : "TBD"}</td>
              <td>
                <Link className="btn btn-primary mr-2" to={{ pathname: `/tasks/${task.id}`, selectedTask: task }}>View / Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}