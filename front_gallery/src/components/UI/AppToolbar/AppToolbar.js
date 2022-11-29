import React from 'react';
import {AppBar, Toolbar, Typography, Link, Grid} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import {useSelector} from "react-redux";
import UserMenu from './Menus/UserMenu';
import AnonymousMenu from './Menus/AnonymousMenu';

const AppToolbar = () => {
    const {user} = useSelector(state => state.users);
    return (
        <AppBar sx={{backgroundColor: '#502020', padding:"15px 0 5px"}} position="static">
            <Toolbar variant="dense">
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Typography variant="h6" color="inherit" component="div">
                        <Link underline='none' sx={{color: 'inherit'}} component={RouterLink} to='/'>Photos Gallery</Link>
                    </Typography>
                    {user ?
                        <UserMenu user={user} />
                        :
                        <AnonymousMenu/>
                    }
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default AppToolbar;
