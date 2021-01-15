import React, { useState, useEffect } from "react";
import axios from '../../axiosConfig';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import TaskTable from "../base/TaskTable";
import {ReactComponent as HelpIcon} from "../../help_outline-24px.svg";

//Retrieve task by id, date and mrn
export default function RecentTasks() {

  const [uncompletedCount, setUncompletedCount] = useState(0);

  useEffect(() => {
    countUncompleted();
  }, []);

  // Number of total uncompleted tasks
  const countUncompleted = async () => {
    const result = await axios.get("/api/tasks/uncompleted");
    setUncompletedCount(result.data.length);
  };

  return (
    <TaskTable assignable={true} endpoint="/api/tasks/recent" title={"Recent tasks"}>
      <Link to="/Uncompleted">
        <Button variant="danger" className="inline-control">
          <span>You have {uncompletedCount} pending tasks </span>
        </Button>
      </Link>
      <p className="mt-3 help-text" style={{lineHeight:"24px"}}><HelpIcon className="mr-2"/>This table displays tasks created over the last 48 hours. Use the "Add a task" button to add a new task. You can view older tasks in the "Archive" page.</p>
    </TaskTable>
  );
}