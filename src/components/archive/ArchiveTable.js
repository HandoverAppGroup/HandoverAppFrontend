import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

// A table that takes tasks in its props and renders them in a table - no state / effects
export default function ArchiveTable(props) {

  return (
    <div className="py-4 table-responsive">
      <table className="table border shadow">
        <thead className="thead-dark">
          <tr>
            <th scope="col" style={{color: 'SlateGrey'}}>#</th>
            <th scope="col" style={{color: 'SlateGrey'}}>DATE CREATED</th>
            <th scope="col" style={{color: 'SlateGrey'}}>DESCRIPTION</th>
            <th scope="col" style={{color: 'SlateGrey'}}>GRADE REQUIRED</th>
            <th scope="col" style={{color: 'SlateGrey'}}>MRN</th>
            <th scope="col" style={{color: 'SlateGrey'}}>LOCATION</th>
            <th scope="col" style={{color: 'SlateGrey'}}>STATUS</th>
            <th scope="col" style={{color: 'SlateGrey'}}>COMPLETED BY</th>
            <th scope="col" style={{color: 'SlateGrey'}}>MORE...</th>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map((task, index) => (
            <tr key={task.id}>
              <th scope="row">{index + 1}</th>
              <td>{moment(task.dateCreated).format('LLL')}</td>
              <td>{task.description}</td>
              <td>{task.gradeRequired}</td>
              <td>{task.patientMrn}</td>
              <td>{task.patientLocation}</td>
              <td>{task.completed ? "Completed" : "Pending..."}</td>
              <td>{task.completer ? task.completer.name : "TBD"}</td>
              <td>
                <Link className="btn btn-primary mr-2" to={{ pathname: `/tasks/${task.id}`, selectedTask: task }}>View/Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}