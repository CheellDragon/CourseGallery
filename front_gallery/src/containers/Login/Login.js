import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Avatar, Button, Container, Grid, Link, Typography, Alert} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FormElement from "../../components/UI/Form/FormElement";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {loginUser} from "../../store/services/usersSlice";

const Login = () => {
    const dispatch = useDispatch();
    const {loginError} = useSelector(state => state.users);
    const [state, setState] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const inputChangeHandler = e => {
        const {name, value} = e.target;
        setState(prevState => ({...prevState, [name]: value}));
    }

    const submitFormHandler = e => {
        e.preventDefault();
        dispatch(loginUser({
            userData: {...state},
            navigate
        }))
    }

    return (
        <Container component='main' maxWidth='xs'>
            <div
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{margin: 1, backgroundColor: 'secondary.main'}}>
                    <LockOpenIcon/>
                </Avatar>
                <Typography component='h1' variant='h5'>
                    Sign in
                </Typography>
                {
                    loginError && (
                        <Alert
                            severity='error'
                            sx={{mt: 3, width: '100%'}}
                        >
                            {loginError.error}
                        </Alert>
                    )
                }
            </div>
            <form
                style={{marginTop: '20px'}}
                onSubmit={submitFormHandler}
            >
                <Grid container spacing={2}>
                    <FormElement
                        required
                        name='username'
                        label='Username'
                        onChange={inputChangeHandler}
                        value={state.username}
                    />
                    <FormElement
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
                    Sign in
                </Button>
                <Grid container justifyContent='flex-end'>
                    <Link
                        component={RouterLink}
                        variant='body2'
                        to='/register'
                    >
                        Or sign up
                    </Link>
                </Grid>
            </form>
        </Container>
    )
}

export default Login;