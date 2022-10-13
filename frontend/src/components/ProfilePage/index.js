import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import Navigation from "../Navigation";
import profilePic from './profilePic.png';
import './ProfilePage.css'

const ProfilePage = () => {
    const currentUser = useSelector(state => state.session.user);

    if (!currentUser) return <Redirect to="/" />;

    // const aboutSelection = (
    //     <div className="selections" id="aboutSelection">
    //         <textarea> Write a little about yourself</textarea>
    //         <h4>Email {currentUser.email} </h4>
    //     </div>
    // );

    // const photostreamSelection = (
    //     <div className="selections" id="photostreamSelection">
    //         <ul>
    //             {/* add user photos posted */}
    //             {/* {currentUser.photos.map(photo => <li key={photo}>{photo}</li>)} */}
    //         </ul>
    //     </div>
    // );

    // const favesSelection = (
    //     <div className="selections" id="favesSelection">
    //         <ul>
    //             {/* add user favorited/liked photos */}
    //             {/* {currentUser.favorites.map(photo => <li key={photo}>{photo}</li>)} */}
    //         </ul>
    //     </div>
    // );

    // const selectTab = (e, selection) => {
    //     let selections = document.getElementsByClassName("selections");
    //     // for (let i = 0; i < selections.length; i++ ) {
    //     //     selections[i].style.display = "none";
    //     // }

    //     let selectedTabs = document.getElementsByClassName("selectedTab");
    //     for (let i = 0; i < selectedTabs.length; i++) {
    //         selectedTabs[i].className = selectedTabs[i].className.replace(" active","");
    //     }

    //     // document.getElementById(selection).style.display = "block";
    //     e.currentTarget.className += " active";
    // };
    


    return (
        <div className="userProfile">
            <Navigation />
            <div className="userCover">
                <img src={ profilePic} alt="user_profile_pic" />
                <div id="userNames">
                    <h4> {currentUser.firstName} {currentUser.lastName}</h4>
                    <br />
                    <h6> {currentUser.username} </h6>
                </div>
                {/* add followers & following */}
                {/* add # of photos */}
            </div>
            <div className="selectionMenu">
                {/* nest in link - /people/username/ */}
                {/* nest in link - /photos/username/ */}
                {/* nest in link - /photos/username/favorites */}
                {/* <button className="selectedTab" onClick={selectTab('click', "aboutSelection")}>About</button>
                <button className="selectedTab" onClick={selectTab('click', "photostreamSelection")}>Photostream</button>
                <button className="selectedTab" onClick={selectTab('click', "favesSelection")}>Faves</button>  */}
                <ul className="selectionTabs">
                    <li>About</li>
                    <li>Photostream</li>
                    <li>Faves</li>
                </ul>
            </div>
            <div className="menuSelection">
                {/* conditional to render selection based on tab selected in 'profileMenu' */}
            </div>
        </div>
    )
}

export default ProfilePage;