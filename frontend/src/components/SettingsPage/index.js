import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchUser, getUser, updateUser, updateUserPics } from "../../store/user";
import { Redirect } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import './SettingsPage.css'


const SettingsPage = () => {

    const dispatch = useDispatch();
    const { userId } = useParams();


    
    const user = useSelector(getUser(userId));
    const currentUser = useSelector(state => state.session.user);
    
    const [firstName, setFirstName] = useState( user ? user.firstName : '' );
    const [lastName, setLastName] = useState( user ? user.lastName : '');
    const [username, setUsername] = useState( user ? user.username : '');
    const [profilePic, setProfilePic] = useState( null );
    const [coverPhoto, setCoverPhoto] = useState( null );



    useEffect(() => {
        dispatch(fetchUser(userId));
    }, []);
    
    if (!currentUser) return <Redirect to="/" />;
    if (!user) return null;

    const handleUpdate = (e) => {
        e.preventDefault();
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        dispatch(updateUser(user));
    };



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

    const handleProfilePic = (e) => {
        e.preventDefault();
        const profPic = e.currentTarget.files[0]
        setProfilePic(profPic);
        const formData = new FormData();
        if (profilePic) {
            formData.append(user.profilePic, profPic);
        };
        // dispatch(updateUser(user));
        setProfilePic(null)
    };

    const handleCoverPhoto = (e) => {

        e.preventDefault();
        
        const formData = new FormData();
        if (coverPhoto) {
            formData.append('user[coverPic]', coverPhoto);
        };
        dispatch(updateUserPics(formData, currentUser.id)); //update to new thunk action
        setCoverPhoto(null)
    }

    const handleCoverFile = (e) => {
        // debugger
        const coverPic = e.currentTarget.files[0]
        setCoverPhoto(coverPic);
    }


    const showPhotosUpdate = () => {
        // console.log(profilePic)
        // console.log(coverPhoto)
        return (
            <div id="photosUpdate">
                {/* <img src={} alt="" /> */}
                {/* <form onSubmit={ handlePofilePic }>
                    <label> Profile Picture
                <h6>Change Profile Picture</h6>
                    <br />
                    <input type="file" onClick={ handleProfilePic } />
                    </label>
                    <input type="submit" value="Update Profile Picture" />
                </form> */}
                <br />
                <form onSubmit={ handleCoverPhoto }>
                    <h6>Change Cover Photo</h6>
                    <br />
                    <label> Cover Photo 
                    <input type="file" onChange={ handleCoverFile }/>
                    </label>
                    <input type="submit" value="Update Cover Photo" />
                </form>

            </div>
        )
    }


    return (
        <div className="settingsPage">
            <Navigation />
            <div className="userSettings">
                <div id="settingsTitle">
                    {user.picture ? <img src={user.picture} alt='' /> : <img src={profilePic} alt="" />}
                    <h1>Account Settings</h1>
                </div>
                <div id='settingsTop'>
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
                    {showPhotosUpdate()}
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

                </div>
            </div>
        </div>
    );
};


export default SettingsPage;