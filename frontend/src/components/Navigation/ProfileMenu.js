import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const ProfileMenu = ({setSelectTab}) => {
    const [showMenu, setShowMenu] = useState(false);
    const currentUser = useSelector(state => state.session.user);
    let profilePath = `/people/${currentUser.id}`
    let settingsPath = `/${currentUser.id}/account-settings`

    
    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    };

    const linksList = (
        <ul className="profile-dropdown" id="profileLinksList">
            {/* <li><a href={profilePath}><button onClick={ () => setSelectTab('aboutTab') }>About</button></a></li> */}
            <li><NavLink to={profilePath}><button >Profile</button></NavLink></li>
            {/* <br /> */}
            {/* <li><a href={profilePath}><button onClick={() => setSelectTab('photostreamTab')}>Photostream</button></a></li> */}
            <li><NavLink to={settingsPath}><button >Settings</button></NavLink></li>
            {/* <br /> */}
            {/* <li><a href={profilePath}><button onClick={() => setSelectTab('favesTab')}>Faves</button></a></li> */}
        </ul>
    );

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    return (
        <div className="profileMenu">
            <button onClick={openMenu}>
                <p>You</p>
            </button>
            { showMenu && linksList }
        </div>

    );


};

export default ProfileMenu;

