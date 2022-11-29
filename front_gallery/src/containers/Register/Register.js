import React, { useState } from 'react';
import {Avatar, Container, Typography, Grid, Button, Link, Alert} from "@mui/material";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../store/services/usersSlice";
import FormElement from "../../components/UI/Form/FormElement";

const Register = () => {
    const {registerError} = useSelector(state => state.users);
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate('/');
    const dispatch = useDispatch();

    const getFieldError = fieldName => {
        try {
            return registerError.errors[fieldName].message;
        } catch (e) {}
    }
    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    }
    const submitHandler = async e => {
        e.preventDefault();
        dispatch(registerUser({
            userData: {...state},
            navigate,
        }));
    }
    return (
        <Container component='section' maxWidth='xs'>
            <div style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Avatar sx={{margin: 1, backgroundColor: 'secondary.main'}}>
                    <HowToRegOutlinedIcon/>
                </Avatar>
                <Typography component='h1' variant='h5'>Sign up</Typography>
                {
                    !!registerError ? (
                        <Alert
                            severity='error'
                            sx={{mt: 3, width: '100%'}}
                        >
                            {registerError.error}
                        </Alert>
                    )
                    : null
                }
                <form onSubmit={submitHandler} style={{marginTop: '20px'}}>
                    <Grid container spacing={2}>
                        <FormElement
                            error={getFieldError('username')}
                            required
                            name='username'
                            label='Username'
                            onChange={inputChangeHandler}
                            value={state.username}
                        />
                        <FormElement
                            error={getFieldError('password')}
                            onChange={inputChangeHandler}
                            required
                            type='password'
                            name='password'
                            label='Password'
                            value={state.password}
                        />
                    </Grid>
                    <Button
                        sx={{
                            marginTop: 3,
                            marginBottom: 2
                        }}
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                    >
                        Sign up
                    </Button>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Link
                                component={RouterLink}
                                variant='body2'
                                to='/login'
                            >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Register;