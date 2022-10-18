import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser, getUser, updateUser } from "../../store/user";
import { Redirect } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import './SettingsPage.css'


const SettingsPage = () => {

    const dispatch = useDispatch();
    const { userId } = useParams();
    // const [showEditName, setShowEditName] = useState(false);

    // const openEditName = () => {
    //     if (showEditName) return;
    //     setShowEditName(true);
    // }

    
    const user = useSelector(getUser(userId));
    const currentUser = useSelector(state => state.session.user);
    
    const [firstName, setFirstName] = useState( user ? user.firstName : '' );
    const [lastName, setLastName] = useState( user ? user.lastName : '');
    const [username, setUsername] = useState( user ? user.username : '');


    useEffect(() => {
        dispatch(fetchUser(userId));
        // if(!showEditName) return;

        // const closeMenu = () => {
        //     setShowEditName(false);
        // };

        // document.addEventListener('click', closeMenu);

        // return () => document.removeEventListener('click', closeMenu);
    }, []);
    
    if (!currentUser) return <Redirect to="/" />;
    if (!user) return null;

    const handleUpdate = (e) => {
        e.preventDefault();
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        console.log(user)
        dispatch(updateUser(user));
    };

    // debugger

    // if (!currentUser) return <Redirect exact to="/" />;

    // const handleEditName = (e) => {
    //     return (
    //         <form action="">
    //             <label > First Name:
    //                 <input type="text" />
    //             </label>
    //             <label > Last Name:
    //                 <input type="text" />
    //             </label>
    //         </form>
    //     )
    // };

    const showNameUpdate = () => {
        return (
            <form onSubmit={ handleUpdate }>
                <div id="firstNameInput">
                    <br />
                    <br />
                    <h6>Update Profile Info</h6>
                    <br />
                    <label> First Name
                        <br />
                        <input type="text" value={ firstName } onChange={(e) => setFirstName(e.target.value)} />
                    </label>
                </div>
                <br />
                <div id="lastNameInput">
                    <label> Last Name
                        <br />
                        <input type="text" value={ lastName } onChange={(e) => setLastName(e.target.value)} />
                    </label>
                </div>
                <br />
                <div id="usernameInput">
                    <label> Username
                        <br />
                        <input type="text" value={ username } onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <br />
                <button type="submit">Update</button>
            </form>
        );

    };


    return (
        <div className="settingsPage">
            <Navigation />
            <div className="userSettings">
                <div id="settingsTitle">
                    <h1>Account Settings</h1>
                </div>
                <div id="accountInfo">
                    <div id="accountDiv">
                        <h6>Account</h6>
                    </div>
                    <br />
                    <div id="loginSettings">
                        <p>Login email</p>
                        <p className="loginEmail">{user.email}</p>
                    </div>
                    <br />
                </div>
                <div className="profileSettings">
                    <div id="profileDiv">
                        <h6>Profile</h6>
                    </div>
                    <br />
                    {/* <img src={user.picture} alt='' /> */}
                    <div>Your real name is <div className="userNames">{user.firstName} {user.lastName}</div></div>
                    <br />
                    <div>Your display name is <div className="userNames">{user.username}</div> </div>

                    { showNameUpdate() }
                    {/* <button onClick={openEditName}>Change</button> */}
                    {/* {showEditName && showNameUpdate()}  */}
                </div>
            </div>
        </div>
    );
};


export default SettingsPage;