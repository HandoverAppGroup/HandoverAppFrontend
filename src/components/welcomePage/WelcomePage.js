import React, { useState, useEffect } from "react";
import { Redirect} from "react-router";
import TaskTable from "../todaysTasks/TaskTable";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

export default function WelcomePage() {
    const [message, setMessage] = useState("");
    const [loginInfo, setLoginInfo] = useState({
        user: "",
        pass: "",
    });
    const username="CharingCross";
    const password="HandoverApp";

    function handleChange(event) {
        const {name, value} = event.target;
        setLoginInfo(prevValue => {
            if (name === "user") {
                return {
                    user: value,
                    pass: prevValue.pass
                };
            } else if (name === "pass") {
                return {
                    user: prevValue.user,
                    pass: value
                };
            }
        });
    }


    function handleClick(event) {

        //setHeading(name);
        // go to recent tasks
        //
        event.preventDefault();
        if (loginInfo.user === username && loginInfo.pass === password){
            setMessage("Successful Login")
        }else{
            setMessage("Wrong username or password, please try again. ")
        }
        //this.props.history.push('/tasks');

        //<Redirect to="app/" />;
        // <BrowserRouter>
        //     <Route exact path="/">
        //return <Redirect to="/tasks" />
        //return history.push('/tasks')
        //     </Route>
        // </BrowserRouter>


    }


    return(
<div className="container-fluid">
    <div className="py-4 table-responsive">
        <h1 className="align"> Welcome</h1>
        <h1 className="align"> {message}</h1>
    </div>
    <form className="form" onSubmit={handleClick}>
        <input type="text" placeholder="Username" onChange={handleChange} value={loginInfo.user} name="user"/>
        <input type="password" placeholder="Password" onChange={handleChange} value={loginInfo.pass} name="pass"/>
        <div className="buttonHolder">
            <button type="submit" >Login</button>
        </div>
        <div className="buttonHolder">
            <Button component={Link} to="/tasks">Recent Tasks</Button>
        </div>
    </form>
</div>
);}