import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navigation from "../Navigation";

const HomePage = () => {
    const currentUser = useSelector(state => state.session.user);
    if (!currentUser) return <Redirect exact to="/" />;

    return (
        <div className="homePage">
            <Navigation/>
            <h4>You're logged in!</h4>
        </div>
    )
}

export default HomePage;