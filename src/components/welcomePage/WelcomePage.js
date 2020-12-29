import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
import logo from '../../logo.png';

export default function WelcomePage() {

    let history = useHistory();
    const {authState, dispatch} = React.useContext(AuthContext);

    const [message, setMessage] = useState("");
    const [loginInfo, setLoginInfo] = useState({
        user: "",
        pass: "",
    });
    const username = "CharingCross";
    const password = "HandoverApp";

    // Get the login status from local storage if page reloaded
    // NOTE this is just for prototyping - real authentication needs to be implemented securely without relying on localStorage

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


    const handleClick = (event) => {

        event.preventDefault();
        if (loginInfo.user === username && loginInfo.pass === password) {
            setMessage("Successful Login");
            dispatch({type: "LOGIN", payload: {user: "AppUser", token: "ABCDE.FGHIJ.KLMNO"}});
            history.push('/tasks');
        } else {
            setMessage("Wrong username or password, please try again. ")
        }

    }

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch({type: "LOGOUT"});
    }

    return (
        <div className="container-fluid">
            <div className="py-4 table-responsive">
                <h1 className="align"> Welcome!</h1>
                <h1 className="align"> {message}</h1>
                <p className="align">Welcome to the online interface that will help the handover of tasks in your team.<br />
                    Here, you can log tasks in a smooth and efficient manner.</p>
                <img src={logo} className="logo-img" alt="Logo" />
            </div>
            {!authState.isAuthenticated &&
            <form className="form" onSubmit={handleClick}>
                <input type="text" placeholder="Username" onChange={handleChange} value={loginInfo.user} name="user" />
                <input type="password" placeholder="Password" onChange={handleChange} value={loginInfo.pass} name="pass" />
                <div className="buttonHolder">
                    <button type="submit" className="btn btn-info welcome-button">Login</button>
                </div>
            </form>}
            {authState.isAuthenticated &&
            <div className="buttonHolder" onClick={handleLogout}>
                <button className="btn btn-info welcome-button">Logout</button>
            </div>}
        </div>
    );
}