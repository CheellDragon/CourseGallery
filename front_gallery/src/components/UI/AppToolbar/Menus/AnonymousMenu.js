import React from 'react';
import {NavLink} from 'react-router-dom';
import {Box, Button} from '@mui/material';

let activeStyle = {
    color: '#ffef0b',
};

const AnonymousMenu = () => (
    <Box>
        <Button
            sx={{
                mr: 3
            }}
            component={NavLink}
            style={({ isActive }) =>
                isActive ? activeStyle : undefined
            }
            to='/register'
            color='inherit'
        >
            Sign Up
        </Button>
        <Button
            style={({ isActive }) =>
                isActive ? activeStyle : undefined
            }
            component={NavLink}
            to='/login'
            color='inherit'>
            Sign In
        </Button>
    </Box>
)

export default AnonymousMenu;