import { RecommendProductsActions, 
    FETCH_RECOMMEND_PRODUCTS_START, 
    FETCH_RECOMMEND_PRODUCTS_SUCCESS,
    FETCH_RECOMMEND_PRODUCTS_FAILURE
} from './recommendProductsActions';

interface IRecommendProductsState {
    productList: any,
    isLoading: boolean,
    error: string | null
}

const initialState: IRecommendProductsState = {
    productList: [],
    // 这里默认一定是加载啊，不然就会直接渲染还没有取得的数据，这个bug我找了半天
    isLoading: true,
    error: null
}

export default (state = initialState, action: RecommendProductsActions) => {
    switch (action.type) {
        case FETCH_RECOMMEND_PRODUCTS_START:
            return {
                ...state,
                isLoading: true,
                error: null
            }
        case FETCH_RECOMMEND_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                productList: action.payload
            }
        case FETCH_RECOMMEND_PRODUCTS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}
