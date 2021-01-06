import React from "react";
import TaskTable from "../base/TaskTable";

// Retrieve task by id, date and mrn
export default function Uncompleted() {
  return (
    <TaskTable completable={false} endpoint="https://handoverapp.herokuapp.com/api/tasks/uncompleted">
      <h1 className="align">Uncompleted Tasks</h1>
    </TaskTable>
  );
}
