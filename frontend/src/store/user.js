import csrfFetch from "./csrf";


export const UPDATE_CURRENT_USER = 'user/updateCurrentUser';

const updateCurrentUser = (user) => ({
    type: UPDATE_CURRENT_USER,
    user
});

export const update = (user) => async dispatch => {
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
    dispatch(updateCurrentUser(data.user));
    return res;

};

const userReducer = ( state = {}, action ) => {
    switch (action.type) {
        case UPDATE_CURRENT_USER:
            return { ...state, user: action.user };
        default: 
            return state; 
    }
};

export default userReducer;