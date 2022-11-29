import csrfFetch from "./csrf";
import { receivePost } from "./posts";
import { receiveUser } from "./user";

export const ADD_COMMENT = '/comments/ADD_COMMENT';
export const ADD_COMMENTS = '/comments/ADD_COMMENTS';
export const REMOVE_COMMENT = '/comments/REMOVE_COMMENT';

export const addComments = (comments) => ({
    type: ADD_COMMENTS,
    comments
})

export const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

export const removeComment = (commentId) => ({
    type: REMOVE_COMMENT,
    commentId
})

export const getComments = ({ comments }) => (comments ? Object.values(comments) : [])
// export const getComment = (commentId) => ({ comments }) => (comments ? comments[commentId] : null)

export const getPostComments = postId => state => (
  Object.values(state.comments)
        .filter(comment => comment.postId === postId)
        .map(comment => ({
            ...comment,
            author: state.users[comment.authorId]?.username
        }))
);

export const fetchComments = () => async dispatch => {
    const res = await csrfFetch('/api/comments');
    const data = await res.json();
    dispatch(addComments(data.comments))
}

export const createComment = (comment) => async dispatch => {
    const res = await csrfFetch("/api/comments", {
        method: "POST",
        body: JSON.stringify(comment)
    });
    const data = await res.json();
    dispatch(addComment(data.comment));
    dispatch(receiveUser(data.user));
    dispatch(receivePost(data.post));
}

export const updateComment = (comment) => async dispatch => {
    const res = await csrfFetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        body: JSON.stringify(comment)
    });
    const data = await res.json();
    dispatch(addComment(data))
}

export const deleteComment = (commentId) => async dispatch => {
    await csrfFetch(`/api/comments/${commentId}`, { method: 'DELETE' });
    dispatch(removeComment(commentId))
}

const commentsReducer = (state = {}, action) => {
    const nextState = { ...state }
    switch (action.type) {
        case ADD_COMMENTS:
            return { ...state, ...action.comments }
        case ADD_COMMENT:
            const comment = action.comment
            return { ...state, [comment.id]: comment };
        case REMOVE_COMMENT:
            delete nextState[action.commentId]
            return nextState;
        default:
            return state;
    }
};

export default commentsReducer;