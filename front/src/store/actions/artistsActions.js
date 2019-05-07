import axios from '../../axios-api';
import {push} from "connected-react-router";
import {NotificationManager} from 'react-notifications';

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';

export const CREATE_ARTIST_REQUEST = 'CREATE_ARTIST_REQUEST';
export const CREATE_ARTIST_SUCCESS = 'CREATE_ARTIST_SUCCESS';
export const CREATE_ARTIST_FAILURE = 'CREATE_ARTIST_FAILURE';

export const PUBLISH_ARTIST = 'PUBLISH_ARTIST';
export const publishArtistSuccess = () => ({type: PUBLISH_ARTIST});

export const DELETE_ARTIST = 'DELETE_ARTIST';
export const deleteArtistSuccess = () => ({type: DELETE_ARTIST});

export const fetchArtistsRequest = () => ({type: FETCH_ARTISTS_REQUEST});
export const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, artists});
export const fetchArtistsFailure = error => ({type: FETCH_ARTISTS_FAILURE, error});

export const createArtistRequest = () => ({type: CREATE_ARTIST_REQUEST});
export const createArtistSuccess = () => ({type: CREATE_ARTIST_SUCCESS});
export const createArtistFailure = error => ({type: CREATE_ARTIST_FAILURE, error});

export const fetchArtists = () => {
    return dispatch => {
        dispatch(fetchArtistsRequest());
        return axios.get('/artists').then(
            response => dispatch(fetchArtistsSuccess(response.data)),
            error => dispatch(fetchArtistsFailure(error))
        )
    }
};

export const createArtist = artistData => {
  return dispatch => {
      dispatch(createArtistRequest());
      return axios.post('/artists', artistData).then(
          () => {
              NotificationManager.success('Artist created!');
              dispatch(createArtistSuccess());
              dispatch(push('/'));
          },
          error => dispatch(createArtistFailure(error))
      )
  }
};

export const publishArtist = artistId => {
    return dispatch => {
        const url = '/artists/' + artistId + '/toggle_publish';
        return axios.post(url).then(
            () => {
                NotificationManager.success('Artist published!');
                dispatch(publishArtistSuccess());
                dispatch(push('/'));
            }
        )
    }
};

export const deleteArtist = artistId => {
    return dispatch => {
        return axios.delete('/artists/' + artistId).then(
            () => {
                NotificationManager.success('Artist removed');
                dispatch(deleteArtistSuccess());
                dispatch(push('/'));
            }
        );
    };
};