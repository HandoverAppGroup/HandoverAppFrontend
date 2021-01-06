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
                        <th scope="col" className="col-header">COMPLETED BY</th>
                        <th scope="col" className="col-header">MORE...</th>
                    </tr>
                </thead>
                <tbody>
                    {props.tasks.map((task, index) => (
                        <tr key={task.id}>
                            <th scope="row">{index + 1}</th>
                            <td style={{ "min-width": "190px" }}>{moment(task.dateCreated).format('LLL').split(" ")[0]} {moment(task.dateCreated).format('LLL').split(" ")[1]}
                                <br /> {moment(task.dateCreated).format('LLL').split(" ")[2]} {moment(task.dateCreated).format('LLL').split(" ")[3]} {moment(task.dateCreated).format('LLL').split(" ")[4]}</td>
                            <td style={{ "max-width": "100px" }}>{task.patientMrn}</td>
                            <td style={{ "max-width": "100px" }}>{task.patientLocation}</td>
                            <td style={{ "max-width": "400px" }}>{task.description}</td>
                            <td style={{ "min-width": "180px" }}>{task.gradeRequired}</td>
                            {props.assignable && <td> <AssignTaskWidget selectedTask={task} /></td>}
                            {!task.completer && (
                                <td className="uncompleted-cell">Pending...</td>
                            )}
                            {task.completer && (
                                <td className="completed-cell">Completed</td>
                            )}
                            <td style={{ "min-width": "150px" }}>{task.completer ? task.completer.name : "TBD"}</td>
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