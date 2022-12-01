import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from "../../store/comments";
import { fetchUser, getUser } from "../../store/user";
import './NewCommentForm.css'

const NewCommentForm = ({postId}) => {
    const [commentBody, setCommentBody] = useState("");
    const currentUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const commentAuthor = useSelector(getUser(currentUser.id));

    useEffect(() => {
        dispatch(fetchUser(currentUser.id))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createComment({postId: postId, authorId: currentUser.id, body: commentBody}))
        setCommentBody("")
    }

    return (
        <div id='newCommentSection'>
            <img className="commentorProfilePic" src={commentAuthor ? commentAuthor.picture : null} alt="user-profile-pic" />
            <form className='commentForm' onSubmit={ handleSubmit }>
                <label>
                    <textarea onChange={e => setCommentBody(e.target.value)} placeholder='Add a comment' value={commentBody} required></textarea>
                </label>
                <input id='commentFormSubmit' type="submit" value="Comment" />
            </form>
        </div>
    )
}

export default NewCommentForm;