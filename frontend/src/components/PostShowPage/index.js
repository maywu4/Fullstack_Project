// Flickr route: /photos/username/postId
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPost, fetchPost } from '../../store/posts';

import './PostShowPage.css'


const PostShowPage = () => {
    const dispatch = useDispatch();
    const { userId, postId } = useParams();
    const post = useSelector(getPost(postId));

    useEffect(() => {
        dispatch(fetchPost(postId));
    }, []);

    if (!post) return null;

    return (
        <div className='postShow'>
            <div className='postDisplay'>
                <img src={post.picture} alt="" />
            </div>
            <div className='postShowInfo'>
                <div className='postInfoTop'>
                    {/* <a href=""> Poster Icon</a> */}
                    {/* <a href=""> */}
                        <h6>Poster Username</h6>
                    {/* </a> */}
                    <h6>Post Title </h6>
                    <h6> {userId}</h6>
                    <h6> {postId}</h6>
                </div>
                <div className='postInfoBottom'>
                    <p>Post description</p>
                </div>  

            </div>


        </div>

    );

};

export default PostShowPage;