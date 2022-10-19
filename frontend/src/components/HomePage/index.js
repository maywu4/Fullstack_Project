import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getPosts, fetchPosts } from "../../store/posts";
import { useEffect, useState } from "react";
import Navigation from "../Navigation";
import PostItem from "./postItem";

const HomePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const posts = useSelector(getPosts);
    // const [posts, setPosts] = useState([]);

    useEffect(() => {
        dispatch(fetchPosts());
    },[]);
    
    console.log(posts)
    
    if (!currentUser) return <Redirect exact to="/" />;
    if (!posts) return null;

    const postItems = posts.map((post) => ( <PostItem key={post} post={post} />))

    return (
        <div className="homePage">
            <Navigation/>
            {/* <h4>You're logged in!</h4> */}
            <ul>
                {/* {postItems} */}
                {/* {posts ? posts.map((post) => (<ul><li>{post}</li></ul>)) : null } */}
                { posts ? postItems : null}
            </ul>
        </div>
    )
}

export default HomePage;