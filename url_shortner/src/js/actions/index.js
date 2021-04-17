

let configData = require("./../../config")
const defaultExpiryDay = configData.api.defaultExpiryDay
export const setLongUrlAct = (url) => {
    return function (dispatch, getState) {
        dispatch({
            type: "LONG_URL",
            payload: url
        })
    }
}

export const setShortUrlAct = (url = "") => {
    return function (dispatch, getState) {
        dispatch({
            type: "SHORT_URL",
            payload: url
        })
    }
}


export const setCustomUrlAct = (url = "") => (dispatch, getState) => {
    return dispatch({
        type: "CUSTOM_URL",
        payload: url
    })
}

export const setExpiryTimeAct = (tme = defaultExpiryDay) => {
    return function (dispatch, getState) {
        dispatch({
            type: "EXPIRY_TIME",
            payload: tme
        })
    }
}
export const setSubmitAct = (val = false) => {
    return function (dispatch, getState) {
        dispatch({
            type: "SUBMIT",
            payload: val
        })
    }
}
export const setErrorAct = (err = null) => {
    return function (dispatch, getState) {
        dispatch({
            type: "ERROR",
            payload: err
        })
    }
}


export const resetAllValue = (data) => {
    return function (dispatch, getState) {
        dispatch(setLongUrlAct())
        dispatch(setShortUrlAct())
        dispatch(setExpiryTimeAct())
        dispatch(setCustomUrlAct())
        dispatch(setErrorAct(null))
    }
}

export const setAllValue = (data) => {
    return function (dispatch, getState) {
        dispatch(setLongUrlAct(data.longurl || ""))
        dispatch(setShortUrlAct(data.shorturl || ""))
        dispatch(setExpiryTimeAct(data.expiryInDays || ""))
        dispatch(setCustomUrlAct(data.customEnding || ""))
        dispatch(setErrorAct(null))
    }
}