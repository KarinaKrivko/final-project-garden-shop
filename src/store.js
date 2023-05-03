// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoryReducer from './reducers/categoryReducer';
import productsReducer from "./reducers/productReducer";


const rootReducer = combineReducers({
    categories: categoryReducer,
    products: productsReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
