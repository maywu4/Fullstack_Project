import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
            <li><a href={profilePath}><button >Profile</button></a></li>
            {/* <br /> */}
            {/* <li><a href={profilePath}><button onClick={() => setSelectTab('photostreamTab')}>Photostream</button></a></li> */}
            <li><a href={settingsPath}><button >Settings</button></a></li>
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

