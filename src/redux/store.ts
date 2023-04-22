import {createStore, applyMiddleware} from 'redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/languageReducer';
import recommendProductsReducer from './recommendProducts/recommendProductsReducer';
import thunk from 'redux-thunk';
import { actionLog } from './middleware/actionLog';
import { productDetailSlice } from './productDetail/slice';
import { productSearchSlice } from './ProductSearch/slice';
import { SignInSlice } from './SignIn/slice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { shoppingCartSlice } from './shoppingCart/slice';
import { orderSlice } from './order/slice';

const persistConfig = {
    key : 'root',
    storage: storage,
    whitelist: ['signIn']
}

const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    signIn: SignInSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);
// 体验一个中间件
// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog))
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
    devTools: true,
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default {store, persistor};
