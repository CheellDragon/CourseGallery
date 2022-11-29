import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axiosApi";

const initialState = {
    registerError: null,
    global: null,
    loginError: null,
    user: null
}

export const loginUser = createAsyncThunk(
    'users/login',
    async (payload, thunkApi) => {
        try {
            const res = await axios.post('/users/sessions', payload.userData);
            payload.navigate('/');
            return res.data;
        } catch (e) {
            if (e.response && e.response.data) {
                thunkApi.dispatch(usersSlice.actions.catchLoginError(e.response.data));
            } else {
                thunkApi.dispatch(usersSlice.actions.globalError(e));
            }
        }
    }
)

export const registerUser = createAsyncThunk(
    'users/register',
    async (payload, thunkApi) => {
        try {
            const res = await axios.post('/users', payload.userData);
            payload.navigate('/');
            return res.data;
        } catch (e) {
            if (e.response && e.response.data) {
                thunkApi.dispatch(usersSlice.actions.catchRegisterError(e.response.data));
            } else {
                thunkApi.dispatch(usersSlice.actions.globalError(e));
            }
        }
    }
)

export const logoutUser = createAsyncThunk(
    'logout/users',
    async (payload, thunkAPI) => {
        await axios.delete('users/sessions');
        thunkAPI.dispatch(usersSlice.actions.logoutUser());
        payload.navigate('/');
    }
)
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        catchRegisterError: (state, action) => {
            state.registerError = action.payload;
        },
        catchLoginError: (state, action) => {
            state.loginError = action.payload;
        },
        globalError: (state, action) => {
            state.global = action.payload;
        },
        logoutUser: (state) => {
            state.user = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(registerUser.fulfilled, state => {
                state.loginError = undefined;
                state.global = undefined;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.registerError = undefined;
                state.global = undefined;
            })
            .addCase(registerUser.pending, state => {
                state.loginError = undefined;
                state.global = undefined;
                state.registerError = undefined;
            })
            .addCase(loginUser.pending, state => {
                state.loginError = undefined;
                state.global = undefined;
                state.registerError = undefined;
            })

    }
})

export default usersSlice.reducer;