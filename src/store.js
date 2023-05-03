
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import actionReducer from "./reducers/categoriesReducer";

const rootReducer = combineReducers({
    action: actionReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
