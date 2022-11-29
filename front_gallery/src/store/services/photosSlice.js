import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axiosApi";

const initialState = {
    photos: [],
    modalShow: false,
    modalPhoto: undefined,
};

export const fetchPhotos = createAsyncThunk(
    'photos/fetch',
    async () => {
        return await axios.get('/photos').then(res => res.data);
    }
)

export const createPhotos = createAsyncThunk(
    'photos/create',
    async(payload) => {
        const photo = await axios.post('/photos', payload.photoData).then(res => res.data);
        payload.navigate('/');
        return photo;
    }
)

export const deletePhotos = createAsyncThunk(
    'photos/delete',
    async(payload) => {
        const res = await axios.delete('/photos',{
            headers: {
                Authorization : payload.token
            },
            data: {
                id:payload.objectId.id
            }
        }).then(res => res.data);
        if(payload.exact) {
            payload.navigate("/profile");
        } else {
            payload.navigate("/");
        }
        return res.data;
    }
)
const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        modalShow: (state, action) => {
            state.modalShow = true;
            state.modalPhoto = action.payload;
        },
        modalClose: state => {
            state.modalShow = false
            state.modalPhoto = undefined;
        }
    },
    extraReducers: {
        [fetchPhotos.fulfilled]: (state, action) => {
            state.photos = action.payload;
        },
        [createPhotos.fulfilled]: (state, action) => {
            state.photos.push(action.payload);
        }
    }
})
export const {modalShow, modalClose} = photosSlice.actions;
export default photosSlice.reducer;