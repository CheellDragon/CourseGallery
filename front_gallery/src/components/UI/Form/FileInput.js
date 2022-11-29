import React from 'react';
import {Button, Grid, Typography} from "@mui/material";

const FileInput = ({onChange, name, title, image}) => {
    return (
        <Grid item xs>
            <Button variant="contained" component="label" sx={{color: 'white',backgroundColor: '#502020',fontSize: '20px', marginTop: '20px','&:hover': {color: '#502020',backgroundColor: 'white'}}}>
                {title}
                <input name={name} onChange={onChange} hidden accept="image/*" type="file" />
            </Button>
            <Typography variant='h6'>
                Image: {image?.name}
            </Typography>
        </Grid>
    )
}

export default FileInput;