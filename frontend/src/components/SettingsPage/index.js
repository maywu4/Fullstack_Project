import { useDispatch, useSelector } from "react-redux";



const SettingsPage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    return (
        <div className="userSettings">
            <div id="accountInfo">
                <h6>Account</h6>
                <div id="loginSettings">
                    <p>Login email</p>
                    <p>{currentUser.email}</p>
                </div>
                <br />
            </div>
            <div className="profileSettings">
                <h6>Profile</h6>
                <img src={currentUser.picture} alt='' />
                <p>Your real name is {currentUser.firstName} {currentUser.lastName}</p>
                <p>Your display name is {currentUser.username}. </p>
            </div>
        </div>
    );
};


export default SettingsPage;