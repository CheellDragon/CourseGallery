import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {Typography} from "@mui/material";
import PhotosForm from "../../components/PhotosForm/PhotosForm";
import {createPhotos} from "../../store/services/photosSlice";

const NewPhotos = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onPhotosFormSubmit = async photoData => {
        await dispatch(createPhotos({photoData, navigate}));
    }

    return (
        <>
            <Typography variant='h4'>
                New Photo
            </Typography>
            <PhotosForm
                createPhotoHandler={onPhotosFormSubmit}
            />
        </>
    )
}

export default NewPhotos;