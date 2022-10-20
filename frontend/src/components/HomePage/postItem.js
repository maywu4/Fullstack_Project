
const PostItem = ({post}) => {

    return (
        <div className="postItem">
            <div className='postPosterInfo'>
                {/* {posterImg} */}
                <h6>PosterUsername</h6>
                <h6>Created At</h6>
            </div>
            <div className="postPicture">
                {/* <a href=""></a> */}
                <img src={post.picture} alt=''/>
            </div>
            <div className="postDetails">
                {/* <a href=""> */}
                    <h6 >{post.title ? post.title : null }</h6>
                {/* </a> */}
                <div >{post.description ? post.description : null }</div>
            </div>
        </div>
    )

};

export default PostItem;