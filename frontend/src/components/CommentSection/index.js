import './CommentSection.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, getComments } from '../../store/comments';
import NewCommentForm from '../NewCommentForm';
import CommentItem from './commentItem';

// import { getUser } from '../../store/user';


const CommentSection = ({postId}) => {
    const dispatch = useDispatch();
    const comments = useSelector(getComments);

    
    useEffect(() => {
        dispatch(fetchComments());
    },[])

    
    const postComments = comments.map((comment, i) => ( <CommentItem comment={comment} postId={postId} key={i}/> ))
        
    
    return (
        <div className='comments'>
            <ul>
                {postComments}
                <li>
                    <NewCommentForm postId={postId} />
                </li>
            </ul>
        </div>
    )
}

export default CommentSection;