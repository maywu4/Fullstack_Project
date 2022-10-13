import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './SignupForm.css'
import Navigation from "../Navigation";
import logoImg from '../Navigation/logo.png';

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (currentUser) return <Redirect to="/" />;

    //to display error for each input
    // const displayError = (errors, input) => {
    //     errors.map( error => {
    //         if (error.key === input) {
    //             return (<p key={error}>{error}</p>)
    //         }
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.signup({ username, firstName, lastName, age, email, password }))
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

    return (
        <div className="signUpPage">
            <Navigation />
            <div className="signUpForm">
                <img src= {logoImg} alt="momentCapture logo" />
                <h6>Sign up for momentCaptur</h6>
                <form onSubmit={handleSubmit}>
                    {errors.map(error => <li className="error"key={error}>{error}</li>)}
                    <div id="usernameInput">
                        <label> Username
                            <br />
                            <input type="text" value={ username } onChange={(e) => setUsername(e.target.value)} required />
                        </label>
                    </div>
                    
                    <br />
                    <div id="firstNameInput">
                        <label> First Name
                            <br />
                            <input type="text" value={ firstName } onChange={(e) => setFirstName(e.target.value)} required />
                        </label>
                    </div>
                    <br />
                    <div id="lastNameInput">
                        <label> Last Name
                            <br />
                            <input type="text" value={ lastName } onChange={(e) => setLastName(e.target.value)} required />
                        </label>
                    </div>
                    <br />
                    <div id="ageInput">
                        <label> Your Age
                            <br />
                            <input type="text" value={ age } onChange={(e) => setAge(e.target.value)} required />
                        </label>
                    </div>
                    <br />
                    <div id="emailInput">
                        <label> Email Address
                            <br />
                            <input type="text" value={ email } onChange={(e) => setEmail(e.target.value)} required />
                        </label>
                    </div>
                    <br />
                    <div id="passwordInput">
                        <label> Password
                            <br />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </label>
                    </div>
                    <br />
                    <button type="submit">Sign Up</button>
                    <br />
                    <br />
                </form>
                <div className="loginLink">
                    Already a MomentCaptur member? <a href="/login">Log in here.</a>
                </div>
            </div>
        </div >
    );
};

export default SignupFormPage;