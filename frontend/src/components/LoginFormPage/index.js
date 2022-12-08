import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import logoImg from '../Navigation/logo.png';
import './LoginForm.css'

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (currentUser) return <Redirect to="/homepage" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }

                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                };
            });
    }

    const loginDemoUser = (e) => {
        return dispatch(sessionActions.login({ credential: 'helloWord@user.io' , password: 'starwarsarethebestwars'}))
    }

    return (
        <div className="loginPage">
            <Navigation />
            <div className="loginForm">
                <img src={logoImg} alt="momentCapture logo" />
                <h6>Log in to MomentCaptur</h6>
                <form onSubmit={ handleSubmit }>
                    {errors.map(error => <li className="error" key={error}>{error}</li>)}
                    <div id="emailLoginInput">
                        <label> Email Address:
                            <input type="text" value={ credential } onChange={(e) => setCredential(e.target.value)} required />
                        </label>
                    </div>
                    <br />
                    <div id="passwordLoginInput">
                        <label> Password:
                            <input type="password" value={ password } onChange={(e) => setPassword(e.target.value)} required />
                        </label>
                    </div>
                    <br />
                    <button type="submit">Sign In</button>
                    <br />
                    <br />
                </form>
                <button onClick={ loginDemoUser }>Demo User</button>
                <br />
                <br />
                <div className="signUpLink">
                    Not a MomentCaptur member? <NavLink to={"/sign-up"}>Sign up here.</NavLink>
                </div>
            </div>
        </div>
    );
};

export default LoginFormPage;