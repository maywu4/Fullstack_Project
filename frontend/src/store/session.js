import csrfFetch, { storeCSRFToken } from "./csrf";

export const SET_CURRENT_USER = 'session/setCurrentUser';
export const REMOVE_CURRENT_USER = 'session/removeCurrentUser';

const setCurrentUser = (user) => ({
    type: SET_CURRENT_USER,
    user
})

const removeCurrentUser = () => ({
    type: REMOVE_CURRENT_USER
})

export const storeCurrentUser = (user) => {
    if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
    } else {
        sessionStorage.removeItem("currentUser");
    };
}

export const signup = (user) => async dispatch => {
    const { username, email, firstName, lastName, age, password } = user;
    const res = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            email,
            firstName,
            lastName,
            age,
            password
        })
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
};

export const login = ({ credential, password }) => async dispatch => {
    const res = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({ credential, password })
    });
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
};

export const restoreSession = () => async dispatch => {
    const res = await csrfFetch("/api/session");
    storeCSRFToken(res);
    const data = await res.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return res;
};

export const logout = () => async dispatch => {
    // const res = await fetch("/api/session", { method: "DELETE", headers: { 'Content-type': 'application/json' } });
    const res = await csrfFetch("/api/session", { method: "DELETE"});
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return res;
};

const sessionReducer = (state = { user: JSON.parse(sessionStorage.getItem("currentUser")) }, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return { ...state, user: action.user };
        case REMOVE_CURRENT_USER:
            return { ...state, user: null };
        default:
            return state;
    }
}
export default sessionReducer;