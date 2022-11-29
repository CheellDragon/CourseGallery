import React, {useState} from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import {useDispatch} from 'react-redux';
import {logoutUser} from '../../../../store/services/usersSlice';
import {useNavigate} from 'react-router-dom';

const UserMenu = ({user}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const navToProfile = ()=>{
        navigate('/profile')
    }
    const logout = () => {
        dispatch(logoutUser({navigate}));
    }
    return (
        <>
            <Button variant='contained' sx={{color:"#502020", backgroundColor:"white",margin:"0 0 10px 10px",'&:hover': {backgroundColor: '#502020',color:"white"}}}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={handleClick}
                color='inherit'
            >
                {user.username} 's - menu
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                id='simple-menu'
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={navToProfile}>Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu;