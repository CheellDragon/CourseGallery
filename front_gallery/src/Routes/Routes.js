import React from 'react';
import Photos from '../containers/Photos/Photos';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import NewPhotos from '../containers/NewPhotos/NewPhotos';
import Register from '../containers/Register/Register';
import Login from '../containers/Login/Login';
import {Routes as Routers, Route} from 'react-router-dom';
import { useSelector,shallowEqual } from 'react-redux';
import PhotoModal from '../components/UI/PhotoModal/PhotoModal';

const Routes = ({user}) => {
    const {modalShow} = useSelector(state => state.photos, shallowEqual);
    return (
        <>
        <PhotoModal show={modalShow}/>
        <Routers>
            <Route path='/' element={<Photos exact={false}/>}/>
            <Route path='/profile' element={<Photos exact={true}/>}/>
            <Route path='/photos/new' element={(
                <ProtectedRoute
                    isAllowed={user}
                    redirectedPath='/'
                >
                    <NewPhotos/>
                </ProtectedRoute>
            )}/>
            <Route path='/register' element={(
                <ProtectedRoute
                    isAllowed={!user}
                    redirectedPath='/'
                >
                    <Register/>
                </ProtectedRoute>
            )}/>
            <Route path='/login' element={(
                <ProtectedRoute
                    isAllowed={!user}
                    redirectedPath='/'
                >
                    <Login/>
                </ProtectedRoute>
            )}/>
        </Routers>
        </>
    )
}

export default Routes;