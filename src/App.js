import React from 'react';
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Header from './components/base/Header';
import TaskTable from './components/table/TaskTable';
import AddTask from './components/forms/AddTask';
import EditTask from './components/forms/EditTask';
// import "styles/react-router-tabs.css";




export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Header />
          <NavLink to="/">All tasks</NavLink>
          <NavLink to="/tasks/add">Add a task</NavLink>
        </header>
        <Switch>
          <Route exact path="/" component={TaskTable} />
          <Route exact path="/tasks/add" component={AddTask} />
          <Route path="/tasks/:id" component={EditTask} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

