import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from 'moment';
import AssignTaskWidget from '../forms/AssignTaskWidget';
import CompleteTaskPopup from '../forms/CompleteTaskPopup';
import Button from "react-bootstrap/Button";

//Retrieve task by id, date and mrn
export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [showCompleteTaskPopup, setShowCompleteTaskPopup] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);
  const [uncompletedCount, setUncompletedCount] = useState(0);

  useEffect(() => {
    loadTasks();
    countUncompleted();
  }, []);

  const loadTasks = async () => {
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks/recent");
    setTasks(result.data);
  };

  const completeTask = (task) => {
    setShowCompleteTaskPopup(true);
    setTaskToComplete(task);
  }

  const onCompleteTaskPopupHide = () => {
    // Reload the tasks to show updated data
    setShowCompleteTaskPopup(false);
    setTaskToComplete(null);
  }

  const countUncompleted = async () => {
      const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks/uncompleted");
      var buttonText = result.data.length;
      setUncompletedCount(buttonText);
    };


  return (
    <div className="container-fluid">
      <CompleteTaskPopup
        show={showCompleteTaskPopup}
        selectedTask={taskToComplete}
        onDataChange={loadTasks}
        onHide={onCompleteTaskPopupHide}
      />
      <div className="py-4 table-responsive">
        <h1 className="align"> Recent tasks</h1>
        <div style ={{height: 45}}>
        <Link to="/Uncompleted">
          <Button variant="danger">
            <span>You have {uncompletedCount} pending tasks </span>
          </Button>
        </Link>
        </div>
        <table className="table border shadow" >
          <thead className="thead-dark header-table">
            <tr>
              <th scope="col" style={{ color: 'White' }}>#</th>
              <th scope="col" style={{ color: 'White' }}>DATE CREATED</th>
              <th scope="col" style={{ color: 'White' }}>MRN</th>
              <th scope="col" style={{ color: 'White' }}>LOCATION</th>
              <th scope="col" style={{ color: 'White' }}>DESCRIPTION</th>
              <th scope="col" style={{ color: 'White' }}>GRADE REQUIRED</th>
              <th scope="col" style={{ color: 'White' }}>ASSIGNED TO</th>
              <th scope="col" style={{ color: 'White' }}>STATUS</th>
              <th scope="col" style={{ color: 'White' }}>MORE...</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <th scope="row">{index + 1}</th>
                <td style={{"min-width":"190px"}}>{moment(task.dateCreated).format('LLL').split(" ")[0]} {moment(task.dateCreated).format('LLL').split(" ")[1]}
                  <br/> {moment(task.dateCreated).format('LLL').split(" ")[2]} {moment(task.dateCreated).format('LLL').split(" ")[3]} {moment(task.dateCreated).format('LLL').split(" ")[4]}</td>
                <td>{task.patientMrn}</td>
                <td>{task.patientLocation}</td>
                <td style={{"max-width":"800px"}}>{task.description}</td>
                <td style={{"min-width":"180px"}}>{task.gradeRequired}</td>
                <td> <AssignTaskWidget selectedTask={task} /></td>
                {task.completer ? <td style={{ backgroundColor: '#55efc4' }}>Completed</td> : <td style={{ backgroundColor: '#e17055' }}>Pending...</td>}
                <td>
                  <Link className="btn btn-info m-2" to={{ pathname: `/tasks/${task.id}`, selectedTask: task }}>View/Edit</Link>
                  {!task.completer && <Button variant="success" className="m-2" onClick={() => completeTask(task)}>Complete</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}