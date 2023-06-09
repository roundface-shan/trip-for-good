import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from 'axios';

// 这种工厂模式的好处就是减少拼写错误

// 开始调用推荐信息的异步api
export const FETCH_RECOMMEND_PRODUCTS_START = "FETCH_RECOMMEND_PRODUCTS_START";
// 调用成功
export const FETCH_RECOMMEND_PRODUCTS_SUCCESS = "FETCH_RECOMMEND_PRODUCTS_SUCCESS";
// 调用失败
export const FETCH_RECOMMEND_PRODUCTS_FAILURE = "FETCH_RECOMMEND_PRODUCTS_FAILURE";

interface IFetchStartAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_START
}
interface IFetchSuccessAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    payload: any
}
interface IFetchFailureAction {
    type: typeof FETCH_RECOMMEND_PRODUCTS_FAILURE,
    payload: any
}

export type RecommendProductsActions = IFetchStartAction | IFetchSuccessAction | IFetchFailureAction;

export const fetchStartCreator = (): IFetchStartAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_START
    }
}
export const fetchSuccessCreator = (data): IFetchSuccessAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_SUCCESS,
        payload: data
    }
}
export const fetchFailureCreator = (error): IFetchFailureAction => {
    return {
        type: FETCH_RECOMMEND_PRODUCTS_FAILURE,
        payload: error
    }
}

export const showMeYourDataCreator = (): ThunkAction<void, RootState, unknown, RecommendProductsActions> =>
    async (dispatch) => {
    dispatch(fetchStartCreator())
        try{
            const {data} = await axios
            .get('http://123.56.149.216:8080/api/productCollections')
            dispatch(fetchSuccessCreator(data))
        }catch (error) {
            if (error instanceof Error) {
                dispatch(fetchFailureCreator(error.message))
            }
        }
}