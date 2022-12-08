import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser } from "../../store/user";
import { NavLink} from "react-router-dom";


const PostItem = ({post}) => {
    // const postPoster = useSelector(getUser(post.posterId))
    const dispatch = useDispatch();
    const posterProfileLink = post ? `/people/${post.posterId}` : null
    const postShowLink = `/photos/${post.id}`
    const postPoster = useSelector(getUser(post.posterId));

    useEffect(() => {
        dispatch(fetchUser(post.posterId))
    }, [])

    return (
        <div className="postItem">
            <div className='postPosterInfo'>
                {/* {posterImg} */}
                <NavLink to={posterProfileLink}><img className='commentorProfilePic' src={postPoster ? postPoster.picture : null} alt="user-profile-pic" /></NavLink>
                {/* {post.poster.picture === null ? <h6>Null</h6> : <h6>Not Null</h6> } */}
                <div >
                    <NavLink to={posterProfileLink}>
                        <h4> {post.poster.username}</h4>
                    </NavLink>
                    <h6>Created at {post.createdAt}</h6>
                </div>

            </div>
            <div className="postPicture">
                <NavLink to={`/photos/${post.id}`}><img src={post.picture} alt='' /></NavLink>
            </div>
            <div className="postDetails">
                <NavLink to={`/photos/${post.id}`}><h6 >{post.title ? post.title : null}</h6></NavLink>
                
                <div >{post.description ? post.description : null }</div>
            </div>
        </div>
    )

};

export default PostItem;