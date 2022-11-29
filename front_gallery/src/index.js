import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Provider} from "react-redux";
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import {configureStore} from "@reduxjs/toolkit";
import photosReducer from './store/services/photosSlice';
import usersReducer from './store/services/usersSlice';
import axios from './axiosApi';

const localStorageMiddleware = ({getState}) => next => action => {
    const result = next(action);
    localStorage.setItem('user', JSON.stringify(getState().users.user));
    return result;
};

const loadFromLocalStorage = () => {
    if(localStorage.getItem('user') !== null) {
        return {users: {user: JSON.parse(localStorage.getItem('user'))}}
    }
    return undefined;
}

const store = configureStore({
    reducer: {
        users: usersReducer,
        photos: photosReducer,
    },
    preloadedState: loadFromLocalStorage(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
})

axios.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e){}
    return config;
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

reportWebVitals();
