

import setValueReducer from "./setValueReducer"
// import loggedReducer from "./isLogged"

import { combineReducers } from "redux"


const allReducers = combineReducers({
    esy: setValueReducer,
})

export default allReducers