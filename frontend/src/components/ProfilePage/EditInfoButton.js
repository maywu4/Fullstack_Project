import { useState, useEffect } from "react"
// import { useSelector } from "react-redux";
// import SettingsPage from "../SettingsPage";
import { NavLink } from "react-router-dom";


const EditInfoButton = ({user}) => {
    const [showMenu, setShowMenu] = useState(false);
    // const currentUser = useSelector(state => state.session.user);
    let settingsPath = `/${user.id}/account-settings`
    
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const editsList = (
        <ul className="profile-dropdown" id="profileLinksList">
            <li><NavLink to={settingsPath}><button>Change photos</button></NavLink></li>
            <li><NavLink to={settingsPath}><button>Edit username</button></NavLink></li>
            <li><NavLink to={settingsPath}><button>Edit real name</button></NavLink></li>
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
        <div className="editMenu">
            <button onClick={openMenu}>
                <p>...</p>
            </button>
            {showMenu && editsList}
        </div>
    );
};

export default EditInfoButton;