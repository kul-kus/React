

import store from "./../store"

export const increment = (nr = 1) => {
    return function (dispatch, getState) {
        dispatch({
            type: "INCREMENT",
            payload: nr
        })
    }
}

export const decrement = (nr = 1) => {
    return function (dispatch, getState) {
        dispatch({
            type: "DECREMENT",
            payload: nr
        })
    }
}


export const islogged = () => (dispatch, getState) => {
    return dispatch({
        type: "SIGN_IN",
        payload: ""
    })
}


export const thunk_fun = (inc) => {
    return (dispatch, getState) => {
        dispatch(increment(inc))
        dispatch(islogged(inc))
    }
}

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};