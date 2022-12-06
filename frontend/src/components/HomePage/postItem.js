import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, getUser } from "../../store/user";


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
                <a href={posterProfileLink}><img className='commentorProfilePic' src={postPoster ? postPoster.picture : null} alt="user-profile-pic" /></a>
                {/* {post.poster.picture === null ? <h6>Null</h6> : <h6>Not Null</h6> } */}
                <div >
                    <a href={posterProfileLink}>
                        <h4> {post.poster.username}</h4>
                    </a>
                    <h6>Created at {post.createdAt}</h6>
                </div>

            </div>
            <div className="postPicture">
                {/* <a href=""></a> */}
                <a href={postShowLink}><img src={post.picture} alt=''/></a>
            </div>
            <div className="postDetails">
                
                <a href={postShowLink}>
                    <h6 >{post.title ? post.title : null }</h6>
                </a>
                
                <div >{post.description ? post.description : null }</div>
            </div>
        </div>
    )

};

export default PostItem;