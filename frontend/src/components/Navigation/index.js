import { useSelector } from "react-redux"
import React from "react";
import UserButton from "./UserButton";
import logoImg from './logo.png'
import './Navigation.css'
import ProfileMenu from "./ProfileMenu";



const Navigation = () => {
    const currentUser = useSelector(state => state.session.user);
    const loggedInLinks = (
        <div>
            <ul className="loggedInLinks">
                <li id="youMenu"><ProfileMenu /></li>
                <li id="userMenu"><UserButton user={currentUser} /></li>
            </ul> 
        </div>
    );

    const loggedOutLinks = (
        <>
            <ul>
                <li id="logInButton"><a href="/login">Log In</a></li>
                <li id="signUpButton"><a href="/sign-up">Sign Up</a></li>
            </ul>
        </>
    );


    // const solidNavBar = () => {
    //     if (currentUser) {
    //         return { backgroundColor: "black" }
    //     }
    // };

    // { currentUser ? (style = {{ backgroundColor: "black" } }) : (style = {{ backgroundColor: "white" }}) } 

    return (
        <div className="navBar">
            <div className="left">
                <img src={ logoImg } alt="MomentCaptur logo" />
                <h1><a href="/">momentCaptur</a></h1>
            </div>
            <div className="navMenu">
                { currentUser ? loggedInLinks : loggedOutLinks}
            </div>
        </div>


    );

};

export default Navigation;

