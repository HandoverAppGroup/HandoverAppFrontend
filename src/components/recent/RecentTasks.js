import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import TaskTable from "../base/TaskTable";

//Retrieve task by id, date and mrn
export default function RecentTasks() {

  const [uncompletedCount, setUncompletedCount] = useState(0);

  useEffect(() => {
    countUncompleted();
  }, []);

  const countUncompleted = async () => {
    const result = await axios.get("https://handoverapp.herokuapp.com/api/tasks/uncompleted");
    setUncompletedCount(result.data.length);
  };

  return (
    <TaskTable assignable={true} endpoint="https://handoverapp.herokuapp.com/api/tasks/recent" title={"Recent tasks"}>
      <Link to="/Uncompleted">
        <Button variant="danger" className="inline-control">
          <span>You have {uncompletedCount} pending tasks </span>
        </Button>
      </Link>
    </TaskTable>
  );
}