import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Button from "react-bootstrap/Button";

// A table that takes tasks in its props and renders them in a table - no state / effects
export default function ArchiveTable(props) {

  return (
    <div className="py-4 table-responsive">
      <table className="table border shadow">
        <thead className="thead-dark">
          <tr>
            <th scope="col" style={{color: 'White'}}>#</th>
            <th scope="col" style={{color: 'White'}}>DATE CREATED</th>
            <th scope="col" style={{color: 'White'}}>MRN</th>
            <th scope="col" style={{color: 'White'}}>LOCATION</th>
            <th scope="col" style={{color: 'White'}}>DESCRIPTION</th>
            <th scope="col" style={{color: 'White'}}>GRADE REQUIRED</th>
            <th scope="col" style={{color: 'White'}}>STATUS</th>
            <th scope="col" style={{color: 'White'}}>COMPLETED BY</th>
            <th scope="col" style={{color: 'White'}}>MORE...</th>
          </tr>
        </thead>
        <tbody>
          {props.tasks.map((task, index) => (
            <tr key={task.id}>
              <th scope="row">{index + 1}</th>
              <td>{moment(task.dateCreated).format('LLL')}</td>
              <td>{task.patientMrn}</td>
              <td>{task.patientLocation}</td>
              <td>{task.description}</td>
              <td>{task.gradeRequired}</td>
              {!task.completer && (
                  <td style={{backgroundColor: '#e17055'}}>Pending...</td>
              )}
              {task.completer && (
                  <td style={{backgroundColor: '#55efc4'}}>Completed</td>
              )}
              <td>{task.completer ? task.completer.name : "TBD"}</td>
              <td>
                <Link className="btn btn-primary m-2" to={{ pathname: `/tasks/${task.id}`, selectedTask: task }}>View/Edit</Link>
                {!task.completer && <Button variant="success" className="m-2" onClick={() => props.onCompleteTask(task)}>Complete</Button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}