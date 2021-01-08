import React, { useState, useEffect } from "react";
import axios from '../../axiosConfig';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import TaskTable from "../base/TaskTable";

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
    </TaskTable>
  );
}