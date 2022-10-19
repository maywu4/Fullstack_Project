import csrfFetch from "./csrf";

export const RECEIVE_POSTS = '/posts/RECEIVE_POSTS'
export const RECEIVE_POST = '/posts/RECEIVE_POST'
export const REMOVE_POST = '/posts/REMOVE_POST'

export const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

export const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
})

export const removePost = (postId) => ({
    type: REMOVE_POST,
    postId
})

export const getPosts = ({posts}) => (posts ? Object.values(posts) : [])
export const getPost = (postId) => ({posts}) => ( posts ? posts[postId] : null )


export const fetchPosts = () => async dispatch => {
    const res = await csrfFetch('/api/posts');
    const data = await res.json();
    dispatch(receivePosts(data.posts))
}

export const fetchPost = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}`);
    const data = await res.json();
    dispatch(receivePost(data.post))
};

export const createPost = (post) => async dispatch => {
    // const { title, description } = post;
    const res = await csrfFetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(post)
    });
    const data = await res.json();
    dispatch(receivePost(data))
}

export const updatePost = (post) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify(post)
    });
    const data = await res.json();
    dispatch(receivePost(data))
}

export const deletePost = (postId) => async dispatch => {
    await csrfFetch(`/api/posts/${postId}`, {method: 'DELETE'});
    dispatch(removePost(postId))
}

const postsReducer = ( state = {}, action ) => {
    const nextState = {...state}
    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...state, ...action.posts }
        case RECEIVE_POST:
            const post = action.post
            return { ...state, [post.id]: post };
        case REMOVE_POST:
            delete nextState[action.postId]
            return nextState;
        default: 
            return state;
    }
};

export default postsReducer;