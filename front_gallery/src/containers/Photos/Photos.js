import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Typography, Button, Grid} from "@mui/material";
import {fetchPhotos,deletePhotos} from "../../store/services/photosSlice";
import PhotoItem from "../../components/PhotoItem/PhotoItem";

const Photos = ({exact}) => {
    const {photos} = useSelector(state => state.photos);
    const {user} = useSelector(state => state.users);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPhotos());
    }, [dispatch])
    const deletePhoto = async (id) => {
        const objectId = {id}
        await dispatch(deletePhotos({token:user.token,exact,objectId}));
        dispatch(fetchPhotos())
    }
    if(!user) {
        exact = false
    } 
    return (
        <Grid container direction='column' spacing={2}>
            <Grid
                item
                container
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <Grid item>
                    <Typography variant='h4'>
                        Photos
                    </Typography>
                </Grid>
                {user &&
                    <Grid item>
                        <Button
                            component={Link}
                            sx={{color: 'white',backgroundColor: '#502020',fontSize: '20px', marginTop: '20px','&:hover': {color: '#502020'}}}
                            to='/photos/new'
                        >
                            Add photos
                        </Button>
                    </Grid>
                }
            </Grid>
            {
                exact === false 
                ? <Grid item container direction='row' spacing={1}>
                    {photos.map(photo => (
                        <PhotoItem
                            exact={exact}
                            image={photo.image}
                            key={photo._id}
                            id={photo._id}
                            title={photo.title}
                            username={photo.username}
                            deletePhoto={deletePhoto}
                        />
                    ))}
                </Grid>
                : <Grid item container direction='row' spacing={1}>
                    {photos.map(photo => { 
                        if(photo.user === user._id) {
                        return (
                            <PhotoItem
                                exact={exact}
                                image={photo.image}
                                key={photo._id}
                                id={photo._id}
                                title={photo.title}
                                username={photo.username}
                                deletePhoto={deletePhoto}
                            />
                        )}}
                    )}
                </Grid>
            }
        </Grid>
    )
}

export default Photos;