import React, { useState, useEffect } from "react";
import axios from "axios";
import CompleteTaskPopup from '../forms/CompleteTaskPopup';
import Table from './Table';
import CSVExportButton from './CSVExportButton';

// A stateful table that displays data from an api endpoint, used in the RecentTasks and Uncompleted pages
export default function TaskTable(props) {
  const [tasks, setTasks] = useState([]);
  const [showCompleteTaskPopup, setShowCompleteTaskPopup] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState(null);
  const [loaded, setLoaded] = useState(true);

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

  const completeTask = (task) => {
    setShowCompleteTaskPopup(true);
    setTaskToComplete(task);
  }

  const onCompleteTaskPopupHide = () => {
    // Reload the tasks to show updated data
    setShowCompleteTaskPopup(false);
    setTaskToComplete(null);
  }

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
          {props.children}
          <CSVExportButton tasks={tasks}/>
          <Table tasks={tasks} onCompleteTask={completeTask} assignable={props.assignable}/>
        </div>
        : <h1 className="pt-3">Loading...</h1>}
    </div>
  );
}