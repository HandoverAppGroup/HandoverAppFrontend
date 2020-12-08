import React, {Component} from 'react';
import Header from './components/header';
import Tabs from "./components/Tabs";
import Home from "./components/Home";
import About from "./components/Archive";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import User from "./components/User";

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

class App extends Component{
render(){
  return (
  <Router>
    <div className="App">
      <Header />
      <h1>Tabs Demo</h1>
            <Tabs>
              <div label="Today's tasks">
                <em>page</em>!
              </div>
              <div label="Add new task">

              </div>
              <div label="Archive">
                archive table
              </div>
            </Tabs>
      <Navbar />
      <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route exact path="/users/add" component={AddUser} />
                <Route exact path="/users/edit/:id" component={EditUser} />
                <Route exact path="/users/:id" component={User} />
                <Route component={NotFound} />
              </Switch>

    </div>
    </Router>
  );
  }
}
export default App;