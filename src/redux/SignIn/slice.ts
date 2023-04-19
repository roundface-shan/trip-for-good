import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignInState{
    token: string | null,
    isLoading: boolean,
    error: string | null | undefined
}

const initialState: SignInState = {
    token: null,
    isLoading: false,
    error: null
}

export const userSignIn = createAsyncThunk(
    'signIn/userSignIn',
    async (paramaters: {
        username: string,
        password: string
    }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8080/auth/login`, {
                email: paramaters.username,
                password: paramaters.password
            })
        return data.token
    } 
)

export const SignInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        signOut: (state) => {
            state.token = null
            state.error = null
            state.isLoading = false
        }
    },
    extraReducers: {
        [userSignIn.pending.type]: (state) => {
            // 原先得这么写：return {...state, isLoading: true, error: null}
            state.isLoading = true;
            state.error = null;
        },
        [userSignIn.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.token = action.payload;
        },
        [userSignIn.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})
