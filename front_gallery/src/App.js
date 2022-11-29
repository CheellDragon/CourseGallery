import React from 'react';
import Routes from './Routes/Routes';
import {CssBaseline, Container} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {useSelector} from 'react-redux';

const App = () => {
    const {user} = useSelector(state => state.users);
    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth='xl'>
                    <Routes user={user}/>
                </Container>
            </main>
        </>
    )
};

export default App;
