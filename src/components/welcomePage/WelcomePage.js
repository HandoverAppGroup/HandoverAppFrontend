import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function WelcomePage(props) {

    let history = useHistory();

    const [message, setMessage] = useState("");
    const [loginInfo, setLoginInfo] = useState({
        user: "",
        pass: "",
    });
    const username = "CharingCross";
    const password = "HandoverApp";

    function handleChange(event) {
        const { name, value } = event.target;
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

        event.preventDefault();
        if (loginInfo.user === username && loginInfo.pass === password) {
            setMessage("Successful Login")
            props.authCallback();
            history.push('/tasks');
        } else {
            setMessage("Wrong username or password, please try again. ")
        }

    }

    function handleLogout(event) {
        // event.preventDefault();
        props.logoutCallback();
    }

    return (
        <div className="container-fluid">
            <div className="py-4 table-responsive">
                <h1 className="align"> Welcome!</h1>
                <h1 className="align"> {message}</h1>
                <p className="align">Welcome to the online interface that will help the handover of tasks in your team.<br />
                    Here, doctors can log tasks in a smooth and efficient manner.</p>
            </div>
            {props.isAuthed ? null :
            <form className="form" onSubmit={handleClick}>
                <input type="text" placeholder="Username" onChange={handleChange} value={loginInfo.user} name="user" />
                <input type="password" placeholder="Password" onChange={handleChange} value={loginInfo.pass} name="pass" />
                <div className="buttonHolder">
                    <button type="submit" className="btn btn-info welcome-button">Login</button>
                </div>
            </form>}
            {props.isAuthed ?
            <div className="buttonHolder" onClick={handleLogout}>
                <button type="submit" className="btn btn-info welcome-button">Logout</button>
            </div> : null}
        </div>
    );
}