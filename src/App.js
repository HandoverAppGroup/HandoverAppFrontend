import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RecentTasks from './components/recent/RecentTasks';
import AddTask from './components/forms/AddTask';
import EditTask from './components/forms/EditTask';
import Archive from './components/archive/Archive';
import WelcomePage from "./components/welcomePage/WelcomePage";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Uncompleted from './components/uncompleted/Uncompleted';
import NotFound from './components/NotFound';

export const AuthContext = React.createContext();

// Authentication
const initialState = {
  // Get the initial login status from local storage by checking for a JWT token
  // More secure implementation would replace local storage with cookies or other alternatives
  isAuthenticated: localStorage.getItem("token") != null,
  username: localStorage.getItem("username"),
  token: localStorage.getItem("token")
};

// Function to change authentication state
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("username", JSON.stringify(action.payload.username));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        username: action.payload.username,
        token: action.payload.token
      };

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        username: null
      };
    default:
      return state;
  }
}

export default function App() {

  const [authState, dispatch] = React.useReducer(reducer, initialState);

// Set up Navigation bar with routing and conditional formatting
  return (
    <AuthContext.Provider value={{authState, dispatch}}>
      <BrowserRouter>
        <Navbar className="color-nav" variant="dark">
          <Navbar.Brand href="/"><b> Charing Cross Hospital Handover Portal</b></Navbar.Brand>
          {authState.isAuthenticated &&
            <Nav className="mr-auto">
              <Nav.Link href="/tasks"><b>Recent tasks</b></Nav.Link>
              <Nav.Link href="/tasks/add"><b>Add a task</b></Nav.Link>
              <Nav.Link href="/Archive"><b>Archive</b></Nav.Link>
            </Nav>}
        </Navbar>
        <Switch>
          <Route exact path="/" render={() => (
            <WelcomePage isAuthed={authState.isAuthenticated} />
          )} />
          
          {authState.isAuthenticated && <Route exact path="/tasks" component={RecentTasks} />}
          {authState.isAuthenticated && <Route exact path="/Archive" component={Archive} />}
          {authState.isAuthenticated && <Route exact path="/tasks/add" component={AddTask} />}
          {authState.isAuthenticated && <Route path="/tasks/:id" component={EditTask} />}
          {authState.isAuthenticated && <Route path="/Uncompleted" component={Uncompleted} /> }
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

