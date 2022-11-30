import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateComment, deleteComment } from '../../store/comments';
import editIcon from './icons8-edit-24.png'
import deleteIcon from './icons8-delete-trash-24.png'


const CommentItem = ({comment, postId, i}) => {
    const dispatch = useDispatch();
    const [body, setBody] = useState(null);
    const [editComment, setEditComment] = useState(false);
    const currentUser = useSelector(state => state.session.user);
    const authorProfileLink = comment ? `/people/${comment.authorId}` : null
    // const commentUser = useSelector(getUser(comment.authorId));

    // console.log(commentUser)

    const handleEdit = (e) => {
        if (editComment) {
            setEditComment(false);
        } else {
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

    console.log(comment.postId)
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
}

export default CommentItem;