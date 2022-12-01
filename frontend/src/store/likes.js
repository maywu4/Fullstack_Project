import csrfFetch from "./csrf";

export const RECEIVE_LIKES = '/likes/RECEIVE_LIKES'
export const RECEIVE_LIKE = '/likes/RECEIVE_LIKE'
export const REMOVE_LIKE = '/likes/REMOVE_LIKE'

export const receiveLikes = (likes) => ({
    type: RECEIVE_LIKES,
    likes
})

export const receiveLike = (like) => ({
    type: RECEIVE_LIKE,
    like
})

export const removeLike = (likeId) => ({
    type: REMOVE_LIKE,
    likeId
})

export const getLikes = ({ likes }) => (likes ? Object.values(likes) : [])
export const getLike = (likeId) => ({ likes }) => (likes ? likes[likeId] : null)

export const fetchLikes = () => async dispatch => {
    const res = await csrfFetch('/api/likes');
    const data = await res.json();
    dispatch(receiveLikes(data.likes))
}

export const fetchLike = (likeId) => async dispatch => {
    const res = await csrfFetch(`/api/like/${likeId}`);
    const data = await res.json();
    dispatch(receiveLike(data.like))
};

export const createLike = (like) => async dispatch => {
    const res = await csrfFetch("/api/likes", {
        method: "POST",
        body: JSON.stringify(like)
    });
    const data = await res.json();
    dispatch(receiveLike(data))
}


export const deleteLike = (likeId) => async dispatch => {
    await csrfFetch(`/api/likes/${likeId}`, { method: 'DELETE' });
    dispatch(removeLike(likeId))
}

const likesReducer = (state = {}, action) => {
    const nextState = { ...state }
    switch (action.type) {
        case RECEIVE_LIKES:
            return { ...state, ...action.likes }
        case RECEIVE_LIKE:
            const like = action.like
            return { ...state, [like.id]: like };
        case REMOVE_LIKE:
            delete nextState[action.likeId]
            return nextState;
        default:
            return state;
    }
};

export default likesReducer;