import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TaskTable from './components/todaysTasks/TaskTable';
import Uncompleted from './components/todaysTasks/Uncompleted';
import AddTask from './components/forms/AddTask';
import EditTask from './components/forms/EditTask';
import Archive from './components/archive/Archive';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar className="color-nav" variant="dark">
        <Navbar.Brand href="/"><b> Charing Cross Hospital Handover Portal</b></Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/"><b>Recent tasks</b></Nav.Link>
          <Nav.Link href="/tasks/add"><b>Add a task</b></Nav.Link>
            <Nav.Link href="/Archive"><b>Archive</b></Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
          <Route exact path="/" component={TaskTable} />
          <Route exact path="/Archive" component={Archive} />
          <Route exact path="/tasks/add" component={AddTask} />
          <Route path="/tasks/:id" component={EditTask} />
          <Route path="/uncompleted" component={Uncompleted} />
      </Switch>
    </BrowserRouter>
  )
}

