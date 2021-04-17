

const initialState = {
    longUrl: "",
    shortUrl: "",
    customUrl: "",
    expiryTime: "",
    isSumitted: false,
    error: ""
};

const loggedReducer = (state = initialState, action) => {

    switch (action.type) {
        case "LONG_URL":
            return Object.assign({}, state, {
                longUrl: action.payload,
            });
        case "SHORT_URL":
            return Object.assign({}, state, {
                shortUrl: action.payload,
            });
        case "CUSTOM_URL":
            return Object.assign({}, state, {
                customUrl: action.payload,
            });
        case "EXPIRY_TIME":
            return Object.assign({}, state, {
                expiryTime: action.payload,
            });
        case "SUBMIT":
            return Object.assign({}, state, {
                isSumitted: action.payload,
            });
        case "ERROR":
            return Object.assign({}, state, {
                error: action.payload,
            });
        default:
            return state
    }
}

export default loggedReducer