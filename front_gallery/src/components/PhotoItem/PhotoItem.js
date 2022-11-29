import React from 'react';
import
{
    Grid,
    Card,
    CardHeader,
    CardActions,
    Button,
    CardMedia,
    Typography,
    CardContent
} from "@mui/material";
import PropTypes from 'prop-types';
import noAvailable from '../../assets/images/noAvailable.jpeg';
import apiURL from "../../config";
import { modalShow } from '../../store/services/photosSlice.js';
import { useDispatch } from 'react-redux';

const PhotoItem = ({id, title, image,username,deletePhoto,exact}) => {
    let cardImage = noAvailable;
    const dispatch = useDispatch();
    const show = ()=>{
        dispatch(modalShow(image))
    }
    if(image) cardImage = `${apiURL}/uploads/${image}`;
    return (
        <Grid sx={{width: "80%",height:"100%"}} item xs={12} sm={6} md={6} lg={4}>
            <Card sx={{backgroundColor: '#502020',color: "white"}}>
                <CardHeader title={title}/>
                <CardContent>
                    <Typography>
                        <b>Author</b>: {username}
                    </Typography>
                </CardContent>
                <CardActions sx={{height: "500px", width: "100%"}}>
                    <Button sx={{height: "100%", width: "100%" , marginBottom: "0"}} onClick={show}>   
                        <CardMedia sx={{height: "100%", width: "100%",marginTop:"0",borderRadius:"20px"}} title={title} image={cardImage}/>
                    </Button>
                </CardActions>
                {
                    exact ?
                    <Button variant='contained' sx={{color:"#502020", backgroundColor:"white",margin:"0 0 10px 10px",'&:hover': {backgroundColor: '#502020',color:"white"}}} onClick={()=>{deletePhoto(id)}}>Delete</Button>
                    : null
                }
            </Card>
        </Grid>
    )
}

PhotoItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
}

export default PhotoItem;