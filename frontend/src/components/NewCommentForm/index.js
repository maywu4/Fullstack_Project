import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from "../../store/comments";
import './NewCommentForm.css'

const NewCommentForm = ({postId}) => {
    const [commentBody, setCommentBody] = useState("");
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createComment({postId: postId, authorId: currentUser.id, body: commentBody}))
        setCommentBody("")
    }

    return (
        <form className='commentForm' onSubmit={ handleSubmit }>
            <label>
                <textarea onChange={e => setCommentBody(e.target.value)} placeholder='Add a comment' value={commentBody} required></textarea>
            </label>
            <input id='commentFormSubmit' type="submit" value="Comment" />
        </form>
    )
}

export default NewCommentForm;