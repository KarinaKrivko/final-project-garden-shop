// store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoriesReducer from './reducers/categoriesReducer';
import productsReducer from "./reducers/productsReducer";
import categoryReducer from "./reducers/categoryReducer";
import productReducer from "./reducers/productReducer";
import cartCounterReducer from "./reducers/cartCounterReducer";


const rootReducer = combineReducers({
    categories: categoriesReducer,
    category: categoryReducer,
    products: productsReducer,
    counter: cartCounterReducer,
    product: productReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
