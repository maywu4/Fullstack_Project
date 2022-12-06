import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, getPost } from "../../store/posts";
import { NavLink } from "react-router-dom";


const FavesItem = ({like}) => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchPost(like.post_id));
    },[])
    
    const post = useSelector(getPost(like.post_id));

    console.log(like)
    console.log(post)
    return (
        <li>
            <NavLink to={`/photos/${like.post_id}`}>
                <img src={post.picture} alt="" />
            </NavLink>
        </li>
    )

}

export default FavesItem;