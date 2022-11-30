import './CommentSection.css'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, getComments, updateComment, deleteComment } from '../../store/comments';
import NewCommentForm from '../NewCommentForm';
// import { getUser } from '../../store/user';
import editIcon from './icons8-edit-24.png'
import deleteIcon from './icons8-delete-trash-24.png'

const CommentSection = ({postId}) => {
    const dispatch = useDispatch();
    const comments = useSelector(getComments);
    const [body, setBody] = useState(null);
    // const [hover, setHover] = useState(false);
    const currentUser = useSelector(state => state.session.user);
    const [editComment, setEditComment] = useState(false);
    
    useEffect(() => {
        dispatch(fetchComments());
    },[])

    // const handleHover = () => {
    //     setHover(true);
    // };

    // const handleNotHover = () => {
    //     setHover(false);
    // }

    // const changeComment = (comment) => {
    //     const handleUpdate = (e) => {
    //         e.preventDefault();
    //         comment.body = body;
    //         dispatch(updateComment(comment));
    //     }

    //     const handleDelete = (e) => {
    //         dispatch(deleteComment(comment.id))
    //     }

    //     if (comment.authorId === currentUser.id) {
    //         return (
    //             <ul>
    //                 <li>
    //                     <img className='commentIcons' src={editIcon} alt="edit-icon" onClick={handleUpdate} />
    //                 </li>
    //                 <li>
    //                     <img className='commentIcons' src={deleteIcon} alt="delete-icon" onClick={handleDelete}/>
    //                 </li>
    //             </ul>
    //         )
    //     } else {
    //         return null;
    //     }
    // }
    
    const postComments = comments.map((comment, i) => {
        const authorProfileLink = comment ? `/people/${comment.authorId}` : null
        // const commentUser = useSelector(getUser(comment.authorId));
        
        // console.log(commentUser)

        const handleEdit = (e) => {
            if (editComment){
                setEditComment(false);
            }else {
                setEditComment(true);
            }
            const handleUpdate = (e) => {
                e.preventDefault();
                comment.body = body;
                dispatch(updateComment(comment));
            }

        }
        

        const handleDelete = (e) => {
            dispatch(deleteComment(comment.id))
        }

        if (comment.postId === parseInt(postId, 10)) { 
            return (
                <li key={i} >
                    <div>
                        <div id='commentTop'>
                            <a href={authorProfileLink}>
                                {comment.author.username}
                            </a>
                            {/* {hover && changeComment(comment)} */}
                            <div>
                                {comment.authorId === currentUser.id ? <img className='commentIcons' src={editIcon} alt="edit-icon" onClick={handleEdit} /> : null}
                                {comment.authorId === currentUser.id ? <img className='commentIcons' src={deleteIcon} alt="delete-icon" onClick={handleDelete} /> : null}
                            </div>
                        </div>
                        <p> {editComment ? <textarea value={body !== null ? body : comment.body} onChange={e => setBody(e.target.value)} ></textarea> : comment.body} </p>

                    </div>
                </li>
            )
        } else {
            return null;
        }
    })
    
    
    return (
        <div className='comments'>
            <ul>{postComments}
                <li>
                    <NewCommentForm postId={postId} />
                </li>
            </ul>
        </div>
    )
}

export default CommentSection;