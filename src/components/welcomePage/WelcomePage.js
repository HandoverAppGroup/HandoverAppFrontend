import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../App";
import logo from '../../logo.png';
import axios from '../../axiosConfig';

export default function WelcomePage() {

    let history = useHistory();
    const { authState, dispatch } = React.useContext(AuthContext);

    const [message, setMessage] = useState("");
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: "",
    });

    // Get the login status from local storage if page reloaded
    // NOTE this is just for prototyping - real authentication needs to be implemented securely without relying on localStorage

    // Set login information
    function handleChange(event) {
        const { name, value } = event.target;
        setLoginInfo(prevValue => {
            if (name === "username") {
                return {
                    username: value,
                    password: prevValue.password
                };
            } else if (name === "password") {
                return {
                    username: prevValue.username,
                    password: value
                };
            }
        });
    }


    const handleClick = (event) => {
        event.preventDefault();
        axios.post('/login', loginInfo)
            .then(response => {
                setMessage("Successful Login");
                dispatch({ type: "LOGIN", payload: { username: loginInfo.username, token: response.data} });
                history.push('/tasks');
            })
            .catch(error => {
                console.log(error);
                setMessage("Wrong username or password, please try again.");
            })
    }

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch({ type: "LOGOUT" });
    }

    // Welcome Page Layout with conditional formatting to show login or logout buttons
    return (
        <div className="container-fluid">
            <div className="py-4 table-responsive">
                <h1 className="align"> Welcome!</h1>
                <h1 className="align"> {message}</h1>
                <p className="align">Welcome to the online interface that will help the handover of tasks in your team.<br />
                    Here, doctors can log tasks in a smooth and efficient manner.</p>
                <img src={logo} className="logo-img" alt="Logo" />
            </div>
            {!authState.isAuthenticated &&
                <form className="form" onSubmit={handleClick}>
                    <input className="form-input" type="text" placeholder="Username" onChange={handleChange} value={loginInfo.username} name="username" />
                    <input className="form-input" type="password" placeholder="Password" onChange={handleChange} value={loginInfo.password} name="password" />
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