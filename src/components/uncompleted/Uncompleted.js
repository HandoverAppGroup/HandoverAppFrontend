import React from "react";
import TaskTable from "../base/TaskTable";

// Retrieve task by id, date and mrn
export default function Uncompleted() {
  return (
    <TaskTable assignable={true} endpoint="/api/tasks/uncompleted" title={"Uncompleted tasks"}/>
  );
}
