import csrfFetch from "./csrf";

export const RECEIVE_USER = 'user/fetchUser';
// export const UPDATE_CURRENT_USER = 'user/updateCurrentUser';


const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

// const updateCurrentUser = (user) => ({
//     type: UPDATE_CURRENT_USER,
//     user
// });

export const getUser = (userId) => ({users}) => (users ? users[userId] : null )

export const fetchUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = res.json();
    dispatch(receiveUser(data));
    return res;
}

export const updateUser = (user) => async dispatch => {
    const { username, email, firstName, lastName, age, password, about } = user;
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            username, 
            email, 
            firstName,
            lastName,
            age,
            password,
            about
        })
    });
    const data = await res.json();
    dispatch(receiveUser(data.user));
    return res;

};

const userReducer = ( state = {}, action ) => {
    switch (action.type) {
        case RECEIVE_USER:
            return { ...state, user: action.user };
        default: 
            return state; 
    }
};

export default userReducer;