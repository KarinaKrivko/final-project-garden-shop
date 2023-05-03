// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoryReducer from './reducers/categoryReducer';

const rootReducer = combineReducers({
    categories: categoryReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
