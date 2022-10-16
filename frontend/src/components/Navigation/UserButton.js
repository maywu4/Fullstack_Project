import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useEffect, useState } from "react";
// import profileImg from '../ProfilePage/profilePic.png'


const UserButton = ({ user }) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();

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


    return (
        <div className="profileOptions">
            <button onClick={openMenu} >
                {/* style={{ backgroundImage: `url("${user.picture}")` }} */}
                {/* <img src={user.picture} alt='' /> */}
            </button>
            { showMenu && profileLinksList }
        </div>
    );
};

export default UserButton;

