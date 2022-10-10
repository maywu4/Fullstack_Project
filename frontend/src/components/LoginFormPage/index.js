import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css'

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (currentUser) return <Redirect to="/" />;

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

    return (
        <>
            {/* <NavBar /> */}
            <div>
                <h4>Log in to MomentCaptur</h4>
                <form onSubmit={ handleSubmit }>
                    <label> Email Address:
                        <input type="text" value={ credential } onChange={(e) => setCredential(e.target.value)} required />
                    </label>
                    <label> Password:
                        <input type="password" value={ password } onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <button type="submit">Sign In</button>
                    {/* <button>Demo User</button> */}
                    <div>
                        {/* Not a MomentCaptur member? <a href="">Sign up here.</a> */}
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginFormPage;