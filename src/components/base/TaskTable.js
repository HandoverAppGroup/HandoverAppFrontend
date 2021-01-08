import React, { useState, useEffect } from "react";
import axios from '../../axiosConfig';
import CompleteTaskPopup from '../forms/CompleteTaskPopup';
import Table from './Table';
import CSVExportButton from './CSVExportButton';

// A stateful table that displays data from an api endpoint, used in the RecentTasks and Uncompleted pages
export default function TaskTable(props) {
  const [tasks, setTasks] = useState([]);
  const [showCompleteTaskPopup, setShowCompleteTaskPopup] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);
  const [loaded, setLoaded] = useState(true);

  // Load tasks from api
  useEffect(() => {
      const loadTasksFromApi = async () => {
          loadTasks(props.endpoint)
      }
    loadTasksFromApi();
  }, [props.endpoint]);

  const loadTasks = async (endpoint) => {
    setLoaded(false);
    const result = await axios.get(endpoint);
    setTasks(result.data);
    setLoaded(true);
  };

  // Popup and conditional formatting when marking a task as completed
  const completeTask = (task) => {
    setShowCompleteTaskPopup(true);
    setTaskToComplete(task);
  }

  const onCompleteTaskPopupHide = () => {
    // Reload the tasks to show updated data
    setShowCompleteTaskPopup(false);
    setTaskToComplete(null);
  }

  // Outputs task table
  return (
    <div className="container-fluid">
      {loaded ?
        <div>
          <CompleteTaskPopup
            show={showCompleteTaskPopup}
            selectedTask={taskToComplete}
            onDataChange={() => loadTasks(props.endpoint)}
            onHide={onCompleteTaskPopupHide}
          />
          <h1 className="align">{props.title}</h1>
          <CSVExportButton tasks={tasks}/>
          {/* props.children allows for component composition so that other components can be nested inside this one, for example the table title or additional controls */}
          {props.children}
          <Table tasks={tasks} onCompleteTask={completeTask} assignable={props.assignable} showCompleter={props.showCompleter}/>
        </div>
        : <h1 className="pt-3">Loading...</h1>}
    </div>
  );
}