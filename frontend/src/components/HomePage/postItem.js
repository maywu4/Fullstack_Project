
const PostItem = ({post}) => {

    return (
        <div>
            <h6 >{post.title ? post.title : null }</h6>
            <div >{post.description ? post.description : null }</div>
        </div>
    )

};

export default PostItem;