import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const currentUser = useSelector(state => state.session.user);
    let profilePath = `/people/${currentUser.username}`

    
    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    };

    const linksList = (
        <ul className="profile-dropdown" id="profileLinksList">
            <li><button><a href={ profilePath }>About</a></button></li>
            {/* <br /> */}
            <li><button><a href={ profilePath }>Photostream</a></button></li>
            {/* <br /> */}
            <li><button><a href={ profilePath }>Faves</a></button></li>
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

