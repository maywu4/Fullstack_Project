import csrfFetch from "./csrf";

export const RECEIVE_POSTS = '/posts/receivePosts'
export const RECEIVE_POST = '/posts/receivePost'

const receivePosts = (posts) => ({
    type: RECEIVE_POSTS,
    posts
})

const receivePost = (post) => ({
    type: RECEIVE_POST,
    post
})

export const getPosts = ({posts}) => (posts ? posts : null)
// export const getPost = (postId) => ({posts}) => ( posts ? posts[postId] : null )


export const fetchPosts = () => async dispatch => {
    const res = await csrfFetch('/api/posts');
    const data = await res.json();
    dispatch(receivePosts(data))
    return res;
}

export const fetchPost = (postId) => async dispatch => {
    const res = await csrfFetch(`/api/posts/${postId}`);
    const data = await res.json();
    dispatch(receivePost(data))
    return res;
};

export const createPost = (post) => async dispatch => {
    // const { title, description } = post;
    const res = await csrfFetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(post)
    });
    const data = await res.json();
    dispatch(receivePost(data))
    return res;
}

const postsReducer = ( state = {}, action ) => {
    switch (action.type) {
        case RECEIVE_POSTS:
            return action.posts;
        case RECEIVE_POST:
            const post = action.post
            return { ...state, [post.id]: post };
        default: 
            return state;
    }
};

export default postsReducer;