import React from "react";
import TaskTable from "../base/TaskTable";

// Retrieve uncompleted tasks
export default function Uncompleted() {
  return (
    <TaskTable assignable={true} endpoint="/api/tasks/uncompleted" title={"Uncompleted tasks"}/>
  );
}
