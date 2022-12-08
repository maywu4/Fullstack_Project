
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, fetchPost, updatePost, deletePost } from '../../store/posts';
// import { getUser } from '../../store/user';
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import Navigation from '../Navigation';
import editIcon from './icons8-edit-96.png'
import copyrightIcon from './icons8-copyright-all-rights-reserved-96.png'
import './PostShowPage.css'
import { getComments } from '../../store/comments';
// import NewCommentForm from '../NewCommentForm';
import CommentSection from '../CommentSection';
import { fetchUser, getUser } from '../../store/user';
import LikeComponent from '../LikeComponent';
import { fetchLikes, getLikes } from '../../store/likes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'


const PostShowPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { postId } = useParams();
    const currentUser = useSelector(state => state.session.user);
    // const comments = useSelector(getPostComments(postId));
    const comments = useSelector(getComments);
    const likes = useSelector(getLikes);
    
    useEffect(() => {
        dispatch(fetchPost(postId));
        dispatch(fetchUser(post.posterId));
    }, []);
    
    const post = useSelector(getPost(postId));
    const postPoster = useSelector(getUser(post.posterId))
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
        history.push('/')
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

    const postLikes = likes.filter(like => like.postId === parseInt(postId, 10));

    const likesSummary = postLikes.map((like, i) => {
        return (
            <div key={like.id}>
                {i === 0 ? 
                    <NavLink className='likerUsername' to={`/people/${like.liker.id}`}>{like.liker.username} </NavLink> 
                : 
                    <NavLink className='likerUsername' to={`/people/${like.liker.id}`}>, {like.liker.username} </NavLink> 
                }
            </div>
        )
        
    })

    const numComments = comments.filter((comment) => {
        if (comment.postId === post.id) return true;
        return false;
    }).length


    const numLikes = likes.filter((like) => {
        if (like.postId === parseInt(postId, 10)) return true;
        return false;
    }).length


    return (
        <div className='postShow'>
            <Navigation />
            <div className='postDisplay'>
                <NavLink id='linkHomepage' to={'/homepage'}>
                    <FontAwesomeIcon icon={faArrowLeft} inverse /> Back to homepage
                </NavLink>
                <img src={post.picture} alt="" />
                <LikeComponent currentUser={currentUser} postId={postId} />
            </div>
            <div id='postShowBottom'>
                <div id='postShowLeft'>
                    
                    <div className='postShowInfo'>
                        <NavLink to={posterProfileLink}>
                            <img className='posterProfilePic' src={post ? postPoster.picture : null} alt="user-profile-pic" />
                        </NavLink>
                        <div className='postInfoTop'>
                            <NavLink to={posterProfileLink}>
                                {post.poster.username}
                            </NavLink>
                            <h6> {post.title} </h6>
                            <div className='postInfoBottom'>
                                <p>{post.description}</p>
                            </div>
                        </div>
                        
                    </div>
                    <div id='likesSummary'> 
                        {numLikes !== 0 ? <FontAwesomeIcon icon={faStar} /> : <FontAwesomeIcon icon={emptyStar} />}
                        &nbsp; 
                        {numLikes !== 0 ? likesSummary : 'No faves yet' }
                        &nbsp; 
                        {numLikes !== 0 ? 'faved this': null}
                        
                    </div>
                    <CommentSection postId={postId}/>
                </div>

                <div id='postShowRight'>
                    <div id='postStats'>
                        
                        <div id='faveStats'>
                            <span>{numLikes}</span>
                            <span className='smallStats' id='faves'>{numLikes=== 1 ? 'fave' : 'faves'}</span>
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