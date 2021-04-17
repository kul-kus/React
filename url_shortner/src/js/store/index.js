
import allReducers from "./../reducers"
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'


// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const loadState = () => {
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
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};


// const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const peristedState = loadState();
const store = createStore(
    allReducers,
    peristedState,
    compose(
        applyMiddleware(thunk),
        // window.devToolsExtension ? window.devToolsExtension() : f => f
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__(): f => f

    )
)

store.subscribe(() => {
    // let tempState = store.getState()
    // saveState(tempState);
    saveState(store.getState());
})

export default store