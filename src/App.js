import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TaskTable from './components/todaysTasks/TaskTable';
import AddTask from './components/forms/AddTask';
import EditTask from './components/forms/EditTask';
import Archive from './components/archive/Archive';
import WelcomePage from "./components/welcomePage/WelcomePage";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function App() {

  const [isAuthed, setAuthed] = useState(localStorage.getItem('isAuthed') ?? false);

  const authenticateUser = () => {
    setAuthed(true);
    localStorage.setItem('isAuthed', true);
  }


  return (
    <BrowserRouter>
      <Navbar className="color-nav" variant="dark">
        <Navbar.Brand href="/"><b> Charing Cross Hospital Handover Portal</b></Navbar.Brand>
        {isAuthed ?
        <Nav className="mr-auto">
          <Nav.Link href="/tasks"><b>Recent tasks</b></Nav.Link>
          <Nav.Link href="/tasks/add"><b>Add a task</b></Nav.Link>
          <Nav.Link href="/Archive"><b>Archive</b></Nav.Link>
        </Nav>
        : null}
      </Navbar>
      <Switch>
        <Route exact path="/" render={() => (
          <WelcomePage authCallback={authenticateUser} isAuthed={isAuthed}/>
        )} />
        <Route exact path="/tasks" component={TaskTable} />
        <Route exact path="/Archive" component={Archive} />
        <Route exact path="/tasks/add" component={AddTask} />
        <Route path="/tasks/:id" component={EditTask} />
      </Switch>
    </BrowserRouter>
  )
}

