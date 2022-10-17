import { useDispatch, useSelector } from "react-redux";
import Navigation from "../Navigation";
// import { Redirect } from "react-router-dom";
import './SettingsPage.css'


const SettingsPage = () => {


    // const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
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

    return (
        <div>
            <Navigation />
            <div className="userSettings">
                <div id="accountInfo">
                    <h6>Account</h6>
                    <br />
                    <div id="loginSettings">
                        <p>Login email</p>
                        <p>{currentUser.email}</p>
                    </div>
                    <br />
                </div>
                <div className="profileSettings">
                    <h6>Profile</h6>
                    <br />
                    {/* <img src={currentUser.picture} alt='' /> */}
                    <p>Your real name is {currentUser.firstName} {currentUser.lastName}</p>
                    {/* <button onClick={ handleEditName }>Edit</button> */}
                    <p>Your display name is {currentUser.username}. </p>
                    {/* <button>Edit</button> */}
                </div>
            </div>
        </div>
    );
};


export default SettingsPage;