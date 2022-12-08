import { NavLink } from "react-router-dom";

const ExplorePosts = ({posts}) => {

    const post1 = posts.find(post => post.title === 'Breath of Fresh Air');
    const post2 = posts.find(post => post.title === "LA Sunset");
    const post3 = posts.find(post => post.title === "Beach day");
    const post4 = posts.find(post => post.title === 'Boston in the Fall');

    return (
        <ul>
            {post1 ? <li id="item1"><NavLink to={`/photos/${post1.id}`}><img src={post1.picture} alt='' /></NavLink></li> : null}
            {post2 ? <li id="item2"><NavLink to={`/photos/${post2.id}`}><img src={post2.picture} alt='' /></NavLink></li> : null}
            {post3 ? <li id="item3"><NavLink to={`/photos/${post3.id}`}><img src={post3.picture} alt='' /></NavLink></li> : null}
            {post4 ? <li id="item4"><NavLink to={`/photos/${post4.id}`}><img src={post4.picture} alt='' /></NavLink></li> : null}
        </ul>
    )
}

export default ExplorePosts;