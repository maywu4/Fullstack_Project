import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, getPost } from "../../store/posts";
import { NavLink } from "react-router-dom";


const FavesItem = ({like}) => {
    const dispatch = useDispatch();
    
    // useEffect(() => {
    //     dispatch(fetchPost(like.postId));
    // })
    
    const post = useSelector(getPost(like.postId));

    console.log(like)
    console.log(like.postId)
    return (
        <li>
            <NavLink to={`/photos/${like.postId}`}>
                <img src={post} alt="" />
            </NavLink>
        </li>
    )

}

export default FavesItem;