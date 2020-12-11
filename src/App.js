import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TaskTable from './components/table/TaskTable';
import AddTask from './components/forms/AddTask';
import EditTask from './components/forms/EditTask';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand href="/"><b>Charing Cross Hospital Handover Portal</b></Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/"><b>Today's tasks</b></Nav.Link>
              <Nav.Link href="/tasks/add"><b>Add a task</b></Nav.Link>
            </Nav>
          </Navbar>
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

