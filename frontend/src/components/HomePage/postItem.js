// import { useSelector } from "react-redux";
// import { getUser } from "../../store/user";


const PostItem = ({post}) => {
    // const postPoster = useSelector(getUser(post.posterId))
    const posterProfileLink = post ? `/people/${post.posterId}` : null
    const postShowLink = `/photos/${post.id}`
    
    return (
        <div className="postItem">
            <div className='postPosterInfo'>
                {/* {posterImg} */}
                {/* <img src={post.poster.picture} alt="" /> */}
                {/* {post.poster.picture === null ? <h6>Null</h6> : <h6>Not Null</h6> } */}
                <a href={posterProfileLink}>
                    <h4> {post.poster.username}</h4>
                </a>
                <h6>Created at {post.createdAt}</h6>

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