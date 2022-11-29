import React, {useState} from 'react';
import {Button, Grid} from "@mui/material";
import FileInput from "../UI/Form/FileInput";
import FormElement from '../UI/Form/FormElement';

const PhotoForm = ({createPhotoHandler, categories}) => {
    const [state, setState] = useState({
        title: '',
        image: ''
    });

    const submitHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        for(let key in state) {
            formData.append(key, state[key]);
        }
        createPhotoHandler(formData);
    }

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    }

    const fileChangeHandler = e => {
        const {name} = e.target;
        const file = e.target.files[0];
        setState(prevState => ({
            ...prevState,
            [name]: file
        }))
    }

    return (
        <form onSubmit={submitHandler}>
            <Grid container direction='column' spacing={2}>
                <FormElement
                    name='title'
                    label='Photo title'
                    required
                    value={state.title}
                    onChange={inputChangeHandler}
                />
                <FileInput
                    onChange={fileChangeHandler}
                    name='image'
                    title="Upload File"
                    image={state.image}
                />
                <Grid item xs>
                    <Button 
                        variant='contained' type='submit'
                        sx={{color: 'white',backgroundColor: '#502020',fontSize: '20px', marginTop: '20px','&:hover': {color: '#502020',backgroundColor: 'white'}}}>
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default PhotoForm;