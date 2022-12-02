
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, fetchPost, updatePost, deletePost } from '../../store/posts';
// import { getUser } from '../../store/user';
import { Redirect } from 'react-router-dom';
import Navigation from '../Navigation';
import editIcon from './icons8-edit-96.png'
import copyrightIcon from './icons8-copyright-all-rights-reserved-96.png'
import './PostShowPage.css'
import { getComments } from '../../store/comments';
// import NewCommentForm from '../NewCommentForm';
import CommentSection from '../CommentSection';
// import { fetchUser, getUser } from '../../store/user';
import LikeComponent from '../LikeComponent';


const PostShowPage = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const currentUser = useSelector(state => state.session.user);
    // const comments = useSelector(getPostComments(postId));
    const comments = useSelector(getComments);
    
    useEffect(() => {
        dispatch(fetchPost(postId));
        // dispatch(fetchUser(post.posterId));
    }, []);
    
    const post = useSelector(getPost(postId));
    // const postPoster = useSelector(getUser(post.posterId))
    const [title, setTitle] = useState( post ? post.title : '' );
    const [description, setDescription] = useState(post ? post.description : '');
    const posterProfileLink = post ? `/people/${post.posterId}` : null


    if (!currentUser) return <Redirect exact to="/" />;
    if (!post) return null;


    const handleUpdate = (e) => {
        e.preventDefault();
        post.title = title;
        post.description = description;
        dispatch(updatePost(post));
    };

    const postUpdateForm = () => {
        return (
            <div id='postUpdate'>
                <form onSubmit={handleUpdate}>
                    <h6><img src={editIcon} alt="" />Edit Post</h6>
                    <br />
                    <div id="postTitleInput">
                        <label> Title
                            <br />
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </label>
                    </div>
                    <br />
                    <div id="postDescriptionInput">
                        <label> Description
                            <br />
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </label>
                    </div>
                    <br />
                    <button type="submit">Update</button>
                </form>
            </div>
        );
    };

    const handleDelete = (e) => {
        dispatch(deletePost(postId));
    }

    const deletePostItem = () => {
        return (
            <div id='postDelete'>
                <h6>Delete Post</h6>
                <br />
                <button onClick={handleDelete}>Delete</button>
            </div>
        )
    }

    // const postComments = comments.map((comment) => (<li key={comment.id} />))

    const numComments = comments.filter((comment) => {
        if (comment.postId === post.id) return true;
        return false;
    }).length


    console.log(post.poster)
    return (
        <div className='postShow'>
            <Navigation />
            <div className='postDisplay'>
                <img src={post.picture} alt="" />
                <LikeComponent />
            </div>
            <div id='postShowBottom'>
                <div id='postShowLeft'>
                    <div className='postShowInfo'>
                        <div className='postInfoTop'>
                            {/* <a href={posterProfileLink}>
                                <img id='posterProfilePic' src={post.poster.picture} alt="" />
                            </a> */}
                            <a href={posterProfileLink}>
                                {post.poster.username}
                            </a>
                            <h6> {post.title} </h6>
                        </div>
                        <div className='postInfoBottom'>
                            <p>{ post.description }</p>
                        </div>
                    </div>
                    <CommentSection postId={postId}/>
                </div>

                <div id='postShowRight'>
                    <div id='postStats'>
                        
                        <div id='faveStats'>
                            <span>#</span>
                            <span className='smallStats' id='faves'>faves</span>
                        </div>
                        <div id='commentsStats'>
                            <span>{numComments}</span>
                            <span className='smallStats' id='comments'>{ numComments === 1 ? 'comment' : 'comments'}</span>
                        </div>
                        
                        <div id='takenStats'>
                            <span className='smallStats'>Created {post.createdAt}</span>
                            <br />
                            <div id='copyright'>
                                <img src={copyrightIcon} alt="" />
                                <span className='smallStats'>All rights reserved.</span>
                            </div>
                        </div>
                    </div>
                    { currentUser.id === post.posterId && postUpdateForm() }
                    { currentUser.id === post.posterId && deletePostItem()}
                </div>


            </div>

        </div>

    );

};

export default PostShowPage;