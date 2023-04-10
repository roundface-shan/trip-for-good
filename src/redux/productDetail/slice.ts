import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface ProductDetailState{
    product: any,
    isLoading: boolean,
    error: string | null | undefined
}

const initialState: ProductDetailState = {
    product: {},
    isLoading: true,
    error: null
}

export const getProductDetail = createAsyncThunk(
    'productDetail/getProductDetail',
    async (productId: string, thunkAPI) => {
        const { data } = await axios.get(
            `http://123.56.149.216:8080/api/touristRoutes/${productId}`)
        return data
    } 
)

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {},
    extraReducers: {
        [getProductDetail.pending.type]: (state) => {
            // 原先得这么写：return {...state, isLoading: true, error: null}
            state.isLoading = true;
            state.error = null;
        },
        [getProductDetail.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.product = action.payload;
        },
        [getProductDetail.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})
