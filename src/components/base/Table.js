import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Button from "react-bootstrap/Button";
import AssignTaskWidget from '../forms/AssignTaskWidget';

// A table that takes tasks in its props and renders them in a table - no state / effects
export default function Table(props) {

    return (
        <div className="py-4 table-responsive">
            <table className="table border shadow">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" className="col-header">#</th>
                        <th scope="col" className="col-header">DATE CREATED</th>
                        <th scope="col" className="col-header">MRN</th>
                        <th scope="col" className="col-header">LOCATION</th>
                        <th scope="col" className="col-header">DESCRIPTION</th>
                        <th scope="col" className="col-header">GRADE REQUIRED</th>
                        {props.assignable && <th scope="col" className="col-header">ASSIGNED TO</th>}
                        <th scope="col" className="col-header">STATUS</th>
                        {props.showCompleter && <th scope="col" className="col-header">COMPLETED BY</th>}
                        <th scope="col" className="col-header">MORE...</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tasks.map((task, index) => (
                        <tr key={task.id}>
                            <th scope="row">{index + 1}</th>
                            {/* formatting of the date in the table (style, minimum horizontal width)*/}
                            <td style={{ "minWidth": "10rem" }}>{moment(task.dateCreated).format('LLL').split(" ")[0]}
                                {moment(task.dateCreated).format('LLL').split(" ")[1]}
                                <br /> {moment(task.dateCreated).format('LLL').split(" ")[2]}
                                {moment(task.dateCreated).format('LLL').split(" ")[3]}
                                {moment(task.dateCreated).format('LLL').split(" ")[4]}</td>
                            <td>{task.patientMrn}</td>
                            <td>{task.patientLocation}</td>
                            <td>{task.description}</td>
                            <td style={{ "minWidth": "10rem" }}>{task.gradeRequired}</td>
                            {props.assignable && <td> <AssignTaskWidget selectedTask={task} /></td>}
                            {/*Conditional formatting depending on completer status (Completed or Pending)*/}
                            {!task.completer && (
                                <td className="uncompleted-cell">Pending...</td>
                            )}
                            {task.completer && (
                                <td className="completed-cell">Completed</td>
                            )}
                            {/*Checks if task has been completed. If so output the completer's name else output To be determined (TBD)*/}
                            {props.showCompleter && <td style={{ "minWidth": "8rem" }}>{task.completer ? task.completer.name : "TBD"}</td>}
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