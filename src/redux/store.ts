import {createStore, applyMiddleware} from 'redux';
import { combineReducers } from '@reduxjs/toolkit';
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import thunk from 'redux-thunk';
import { actionLog } from './middleware/actionLog';
import { productDetailSlice } from './productDetail/slice';

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer
})
// 体验一个中间件
const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))

export type RootState = ReturnType<typeof store.getState>

export default store;
