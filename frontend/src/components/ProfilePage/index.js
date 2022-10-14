import { useSelector } from "react-redux"
import { Redirect } from "react-router-dom";
import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { getUser, fetchUser, updateUser } from "../../store/user";
import littleIsland from './littleIsland.png'; 
import EditInfoButton from "./EditInfoButton";
import Navigation from "../Navigation";
import profilePic from './profilePic.png';
import './ProfilePage.css'

const ProfilePage = () => {
    // const { userId } = useParams();
    // const user = userId ? useSelector(getUser(userId)) : { username:'', email: '', firstName: '', lastName: '', age: 35, password: '', about: '' }
    // const [firstName, setFirstName] = useState();
    // const [lastName, setLastName] = useState();
    // const [username, setUsername] = useState();
    const [about, setAbout] = useState('Write a little about yourself'); 
    const [selectTab, setSelectTab] = useState('aboutTab');
    const currentUser = useSelector(state => state.session.user); // make this dynamic  

    if (!currentUser) return <Redirect exact to="/" />;

    const aboutSelection = (
        <div className="selections" id="aboutSelection">
            <textarea defaultValue={ about }></textarea>
            <h4>Joined {currentUser.createdAt}</h4>
            <h4>Email {currentUser.email} </h4>
        </div>
    );

    const photostreamSelection = (
        <div className="selections" id="photostreamSelection">
            <ul>
                {/* add user photos posted */}
                {/* {currentUser.photos.map(photo => <li key={photo}>{photo}</li>)} */}
                <li><img src={ littleIsland} alt="pic 1" /></li>
                <li><img src={littleIsland} alt="pic 2" /></li>
                <li><img src={littleIsland} alt="pic 3" /></li>
                <li><img src={littleIsland} alt="pic 4" /></li>
                <li><img src={littleIsland} alt="pic 5" /></li>
                <li><img src={littleIsland} alt="pic 6" /></li>
            </ul>
        </div>
    );

    const favesSelection = (
        <div className="selections" id="favesSelection">
            <ul>
                {/* add user favorited/liked photos */}
                {/* {currentUser.favorites.map(photo => <li key={photo}>{photo}</li>)} */}
                <li><img src="https://picsum.photos/206/206" alt="fave 1" /></li>
                <li><img src="https://picsum.photos/206/206" alt="fave 2" /></li>
                <li><img src="https://picsum.photos/206/206" alt="fave 3" /></li>
                <li><img src="https://picsum.photos/206/206" alt="fave 4" /></li>
                <li><img src="https://picsum.photos/206/206" alt="fave 5" /></li>
                <li><img src="https://picsum.photos/206/206" alt="fave 6" /></li>
            </ul>
        </div>
    );

    const selectAbout = () => {
        setSelectTab('aboutTab');
    };


    const selectPhotostream = () => {
        setSelectTab('photostreamTab');
    };

    const selectFaves = () => {
        setSelectTab('favesTab');
    };


    const conditionalShow = () => {
        switch (selectTab) {
            case 'photostreamTab':
                return photostreamSelection;
            case 'favesTab':
                return favesSelection;
            default:
                return aboutSelection;
        }
    };


    return (
        <div className="userProfile">
            <Navigation />
            <div className="userCover">
                <img src={ profilePic} alt="user_profile_pic" />
                <div id="userNames">
                    <div id="coverHeading">
                        <h4> {currentUser.firstName} {currentUser.lastName}</h4>
                        <EditInfoButton />
                    </div>
                    <br />
                    <div id="userInfo">
                        <ul id="userInfoLeft">
                            <li> {currentUser.username} </li>
                            <li> # Followers</li>
                            <li> # Following</li>
                        </ul>
                        <ul id="userInfoRight">
                            <li> # Photos</li>
                            <li> Joined {currentUser.createdAt.slice(0,4)}</li>
                        </ul>
                    </div>
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
                    <li className={ selectTab === 'aboutTab' ? 'active' : "" } onClick={ selectAbout }>About</li>
                    <li className={selectTab === 'photostreamTab' ? 'active' : ""} onClick={ selectPhotostream } >Photostream</li>
                    <li className={ selectTab === 'favesTab' ? 'active' : "" } onClick={ selectFaves } >Faves</li>
                </ul>
            </div>
            <div className="menuSelection">
                {/* conditional to render selection based on tab selected in 'profileMenu' */}
                { conditionalShow()}
                {/* { aboutSelection }
                { photostreamSelection }
                { favesSelection } */}
            </div>
        </div>
    )
}

export default ProfilePage;