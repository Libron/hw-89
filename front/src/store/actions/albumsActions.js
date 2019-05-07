import axios from '../../axios-api';
import {NotificationManager} from 'react-notifications';
import {push} from "connected-react-router";

export const FETCH_ALBUMS_REQUEST = 'FETCH_ALBUMS_REQUEST';
export const FETCH_ALBUMS_SUCCESS = 'FETCH_ALBUMS_SUCCESS';
export const FETCH_ALBUMS_FAILURE = 'FETCH_ALBUMS_FAILURE';

export const CREATE_ALBUM_REQUEST = 'CREATE_ALBUM_REQUEST';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const CREATE_ALBUM_FAILURE = 'CREATE_ALBUM_FAILURE';

export const PUBLISH_ALBUM = 'PUBLISH_ALBUM';
export const publishAlbumSuccess = () => ({type: PUBLISH_ALBUM});

export const DELETE_ALBUM = 'DELETE_ALBUM';
export const deleteAlbumSuccess = () => ({type: DELETE_ALBUM});

export const fetchAlbumsRequest = () => ({type: FETCH_ALBUMS_REQUEST});
export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const fetchAlbumsFailure = error => ({type: FETCH_ALBUMS_FAILURE, error});

export const createAlbumRequest = () => ({type: CREATE_ALBUM_REQUEST});
export const createAlbumSuccess = () => ({type: CREATE_ALBUM_SUCCESS});
export const createAlbumFailure = error => ({type: CREATE_ALBUM_FAILURE, error});

export const fetchAlbums = query => {
    return dispatch => {
        dispatch(fetchAlbumsRequest());
        let url = '/albums';
        if (query) {url += query;}

        return axios.get(url).then(
            response => dispatch(fetchAlbumsSuccess(response.data)),
            error => dispatch(fetchAlbumsFailure(error))
        );
    };
};

export const createAlbum = albumData => {
    return dispatch => {
        dispatch(createAlbumRequest());
        return axios.post('/albums', albumData).then(
            () => {
                NotificationManager.success('Album created!');
                dispatch(createAlbumSuccess());
                dispatch(push('/'));
            },
            error => dispatch(createAlbumFailure(error))
        )
    }
};

export const publishAlbum = albumId => {
    return dispatch => {
        const url = '/albums/' + albumId + '/toggle_publish';
        return axios.post(url).then(
            () => {
                NotificationManager.success('Album published!');
                dispatch(publishAlbumSuccess());
                dispatch(push('/'));
            }
        )
    }
};

export const deleteAlbum = albumId => {
    return dispatch => {
        return axios.delete('/albums/' + albumId).then(
            () => {
                NotificationManager.success('Album removed');
                dispatch(deleteAlbumSuccess());
                dispatch(push('/'));
            }
        );
    };
};