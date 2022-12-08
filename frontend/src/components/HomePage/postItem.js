import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser } from "../../store/user";
import { NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faComment as emptyComment } from '@fortawesome/free-regular-svg-icons'
import { fetchLikes, getLikes } from "../../store/likes";
import { fetchComments, getComments } from "../../store/comments";


const PostItem = ({post}) => {
    // const postPoster = useSelector(getUser(post.posterId))
    const dispatch = useDispatch();
    const posterProfileLink = post ? `/people/${post.posterId}` : null
    const postShowLink = `/photos/${post.id}`
    const postPoster = useSelector(getUser(post.posterId));
    const likes = useSelector(getLikes);
    const comments = useSelector(getComments);

    useEffect(() => {
        dispatch(fetchUser(post.posterId));
        dispatch(fetchLikes());
        dispatch(fetchComments());
    }, [])


    const numLikes = likes.filter((like) => {
        if (like.postId === parseInt(post.id, 10)) return true;
        return false;
    }).length

    const numComments = comments.filter((comment) => {
        if (comment.postId === post.id) return true;
        return false;
    }).length

    return (
        <div className="postItem">
            <div className='postPosterInfo'>
                {/* {posterImg} */}
                <NavLink to={posterProfileLink}><img className='posterProfilePic' src={postPoster ? postPoster.picture : null} alt="user-profile-pic" /></NavLink>
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
                <div id="postDeets">
                    <NavLink to={`/photos/${post.id}`}><h6 >{post.title ? post.title : null}</h6></NavLink>
                    
                    <div >{post.description ? post.description : null }</div>
                </div>
                <div id="postNums">
                    <div id="postLikesSummary">
                        {numLikes !== 0 ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={emptyStar} />}
                        &nbsp;
                        { numLikes }
                        &nbsp;
                        &nbsp;
                    </div>
                    <div id="postCommentsSummary">
                        {numComments !== 0 ? <FontAwesomeIcon icon={faComment} /> : <FontAwesomeIcon icon={emptyComment} />}
                        &nbsp;
                        {numComments}

                    </div>
                </div>
            </div>
            
        </div>
    )

};

export default PostItem;