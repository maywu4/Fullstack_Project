import { useState, useEffect } from "react"
import { useSelector } from "react-redux";

const EditInfoButton = () => {
    const [showMenu, setShowMenu] = useState(false);
    const currentUser = useSelector(state => state.session.user);
    let profilePath = `/people/${currentUser.id}` //to be updates to settings path
    
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    const editsList = (
        <ul className="profile-dropdown" id="profileLinksList">
            <li><button><a href={profilePath}>Change cover photo</a></button></li>
            <li><button><a href={profilePath}>Edit username</a></button></li>
            <li><button><a href={profilePath}>Edit real name</a></button></li>
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