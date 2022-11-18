import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getPosts, fetchPosts } from "../../store/posts";
import { useEffect} from "react";
import Navigation from "../Navigation";
import PostItem from "./postItem";
import NewPostForm from "../NewPostForm";
import './HomePage.css'

const HomePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const posts = useSelector(getPosts);


    useEffect(() => {
        dispatch(fetchPosts());
    },[]);
    
   
    if (!currentUser) return <Redirect exact to="/" />;
    if (!posts) return null;

    const postItems = posts.reverse().map((post) => (<PostItem key={post.id} post={post} />))
    
    console.log(posts.reverse())
    return (
        <div className="homePage">
            <Navigation/>
            {/* <h4>You're logged in!</h4> */}
            <div id="homepageContent">
                <ul>
                    {/* {postItems} */}
                    {/* {posts ? posts.map((post) => (<ul><li>{post}</li></ul>)) : null } */}
                    { postItems }
                </ul>
                <NewPostForm/>
            </div>
        </div>
    )
}

export default HomePage;