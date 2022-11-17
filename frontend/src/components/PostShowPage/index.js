
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


const PostShowPage = () => {
    const dispatch = useDispatch();
    const { postId } = useParams();
    const currentUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(fetchPost(postId));
    }, []);

    const post = useSelector(getPost(postId));
    // const postPoster = useSelector(getUser(post.poster.id))
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
        // return <Redirect exact to="/" />;
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


    return (
        <div className='postShow'>
            <Navigation />
            <div className='postDisplay'>
                <img src={post.picture} alt="" />
            </div>
            <div id='postShowBottom'>
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

                { currentUser.id === post.posterId && postUpdateForm() }

                { currentUser.id === post.posterId && deletePostItem()}
                <div id='postStats'>
                    <div id='faveStats'>
                        <span>#</span>
                        <span className='smallStats' id='faves'>faves</span>
                    </div>
                    <div id='commentsStats'>
                        <span>#</span>
                        <span className='smallStats' id='comments'>comments</span>
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
            </div>

        </div>

    );

};

export default PostShowPage;