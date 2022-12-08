import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { getPosts, fetchPosts } from "../../store/posts";
import { useEffect, useState} from "react";
import Navigation from "../Navigation";
import PostItem from "./postItem";
import NewPostForm from "../NewPostForm";
import './HomePage.css'
import ExplorePosts from "./ExplorePosts";
import mgotbImg from './exploreMGotB.png';
import wavesenseImg from './exploreWavesense.png';

const HomePage = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const posts = useSelector(getPosts);
    const [reload, setReload] = useState(0);


    useEffect(() => {
        dispatch(fetchPosts());
    },[reload]);
    
    if (!currentUser) return <Redirect exact to="/" />;
    if (!posts) return null;

    const postItems = posts.map((post) => (<PostItem key={post.id} post={post} />)).reverse()
    
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
                <div id="homepageRight">
                    <NewPostForm reload={reload} setReload={setReload}/>
                    <div id='explorePosts'>
                        <h6>Explore popular posts</h6>
                        <ExplorePosts posts={posts} />
                    </div>
                    <div id='exploreMGotB'>
                        <a href="https://maywu4.github.io/javascript_project/">
                            <img src={mgotbImg} alt="" />
                            <br />
                            <h6>CLICK HERE to learn how much your money can grow</h6>
                            <br />
                            <span>Ad by Sponsor</span>
                        </a>
                    </div>
                    <div id='exploreWavesense'>
                        <a href="https://wavesense.onrender.com/">
                            <img src={wavesenseImg} alt="" />
                            <br />
                            <h6> Wanna have fun with music? TRY FREE </h6>
                            <br />
                            <span>Ad by Sponsor</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;