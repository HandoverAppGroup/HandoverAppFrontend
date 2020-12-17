import React, { useState, useEffect } from "react";
import { Redirect} from "react-router";

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
        if (loginInfo.user === username && loginInfo.pass === password){
            setMessage("Successful Login")
        }else{
            setMessage("Wrong username or password, please try again. ")
        }
        event.preventDefault();
        <Redirect to="app/" />;

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
        <button type="submit" >Login</button>
    </form>
</div>
);}