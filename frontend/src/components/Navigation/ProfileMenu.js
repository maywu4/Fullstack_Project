import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfileMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const currentUser = useSelector(state => state.session.user);
    let profilePath = `/people/${currentUser.id}`

    
    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    };

    const linksList = (
        <ul className="profile-dropdown" id="profileLinksList">
            <li><a href={ profilePath }><button>About</button></a></li>
            {/* <br /> */}
            <li><a href={ profilePath }><button>Photostream</button></a></li>
            {/* <br /> */}
            <li><a href={ profilePath }><button>Faves</button></a></li>
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

