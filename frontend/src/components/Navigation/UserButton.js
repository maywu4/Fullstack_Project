import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useEffect, useState } from "react";
// import profileImg from '../ProfilePage/profilePic.png'


const UserButton = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const logout = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.logout());
    };

    const profileLinksList = (
        <ul className="profile-dropdown">
            <li> <h6>Hello, { user.username }!</h6></li>
            <li id="logout"><button onClick={logout}>Log out</button></li>
        </ul>
    );

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const styleButton = {
        backgroundImage:`url("${currentUser.picture}")`,
        width: '34px',
        height: '34px',
        backgroundSize: 'cover'
    };

    
    return (
        <div className="profileOptions">
            <button onClick={openMenu} style={styleButton}>
                {/* <img src={currentUser ? currentUser.picture : null} alt="user-profile-pic" /> */}
            </button>
            { showMenu && profileLinksList }
        </div>
    );
};

export default UserButton;

