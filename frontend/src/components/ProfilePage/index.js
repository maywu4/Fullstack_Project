import { useDispatch, useSelector } from "react-redux"
import { Redirect, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser, fetchUser, updateUser } from "../../store/user";
// import littleIsland from './littleIsland.png';
import EditInfoButton from "./EditInfoButton";
import Navigation from "../Navigation";
// import profilePic from './profilePic.png';
import './ProfilePage.css'
import { getPosts, fetchPosts } from "../../store/posts";
import { fetchLikes } from "../../store/likes";
import FavesItem from "./FavesItem";

const ProfilePage = (props) => {
    const dispatch = useDispatch();
    const { userId } = useParams();
    const posts = useSelector(getPosts);
    
    useEffect(() => {
        dispatch(fetchUser(userId));
        dispatch(fetchPosts());
        dispatch(fetchLikes());
    }, []);
    const user = useSelector(getUser(userId));
    const userFavorites = user ? user.likes : null
    const currentUser = useSelector(state => state.session.user);
    const [currentAbout, setCurrentAbout] = useState(null);

 
    const [selectTab, setSelectTab] = useState('aboutTab');


 
    if (!currentUser) return <Redirect to="/" />;
    if (!user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        user.about = currentAbout
        dispatch(updateUser(user));
    }


    const aboutSection = () => {
        return (
            <form className="editAbout" onSubmit={handleSubmit}>
                <label> About Me
                    <br />
                    <textarea value={currentAbout !== null ? currentAbout : user.about } onChange={e => setCurrentAbout(e.target.value)} placeholder='Write a little about yourself'></textarea>
                </label>
                <br />
                <input type="submit" value="Save" />
            </form>)
    };

    const aboutSelection = (
        <div className="selections" id="aboutSelection">
            {(currentUser.id === user.id ? aboutSection() : user.about)}
            <h4>Joined {user.createdAt}</h4>
            <h4>Email {user.email} </h4>
        </div>
    );

    const photostreamItems = posts.map((post) => {
        if (post.posterId === user.id) {
            return (<li key={post.id}><NavLink to={`/photos/${post.id}`}><img src={post.picture} alt="" /></NavLink></li>)
        } else {
            return null
        }
    });

    const userFaveItems = userFavorites.map((like) => {
        return (
            <FavesItem key={like.id} like={like}></FavesItem>
        )
    })

    const photostreamSelection = (
        <div className="selections" id="photostreamSelection">
            <ul>
                {/* add user photos posted */}
                {posts ? photostreamItems : null}
            </ul>
        </div>
    );

    const favesSelection = (
        <div className="selections" id="favesSelection">
            <ul>
                {/* add user favorited/liked photos */}
                {user ? userFaveItems : null}
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

    const numPhotos = posts.filter((post) => {
        if (post.posterId === user.id) return true;
        return false;
    }).length;

    const numFaves = userFavorites.length;
    
    
    return (
        <div className="userProfile">
            <Navigation user={user} setSelectTab={setSelectTab} />
            <div className="userCover" style={{ backgroundImage: `url(${user.coverPhoto})` }}>
                {/* <img src={ profilePic} alt="user_profile_pic" /> */}

                {/* {user.picture ? <img src={user.picture} alt='' /> : <img src={profilePic} alt="" />} */}
                <img src={user.picture} alt='' /> 

                <div id="userNames">
                    <div id="coverHeading">
                        <h4> {user.firstName} {user.lastName}</h4>
                        {(currentUser.id === user.id ? <EditInfoButton user={user}/> : null)}
                    </div>
                    <br />
                    <div id="userInfo">
                        <ul id="userInfoLeft">

                            <li> {user.username} </li>

                        </ul>
                        <ul id="userInfoRight">
                            <li> {numFaves} Faves</li>
                            <li> {numPhotos} Photos</li>
                            <li> Joined {user.createdAt.slice(0, 4)}</li>
                        </ul>
                    </div>
                </div>

            </div>
            <div className="selectionMenu">
                {/* source: LogRocket (https://blog.logrocket.com/how-to-build-tab-component-react/#creating-tab-component) */}
                <ul className="selectionTabs">
                    <li className={selectTab === 'aboutTab' ? 'active' : ""} onClick={selectAbout}>About</li>
                    <li className={selectTab === 'photostreamTab' ? 'active' : ""} onClick={selectPhotostream} >Photostream</li>
                    <li className={selectTab === 'favesTab' ? 'active' : ""} onClick={selectFaves} >Faves</li>
                </ul>
            </div>
            <div className="menuSelection">
                {/* conditional to render selection based on tab selected in 'profileMenu' */}
                {conditionalShow()}

            </div>
        </div>
    )
}

export default ProfilePage;