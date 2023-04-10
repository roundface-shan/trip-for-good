import { createSlice, PayloadAction } from '@reduxjs/toolkit';


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

export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        fetchProductDetailStart: (state) => {
            // 原先得这么写：return {...state, isLoading: true, error: null}
            state.isLoading = true;
            state.error = null;
        },
        fetchProductDetailSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.product = action.payload;
        },
        fetchProductDetailFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const { fetchProductDetailStart, fetchProductDetailSuccess, fetchProductDetailFailure } = productDetailSlice.actions;