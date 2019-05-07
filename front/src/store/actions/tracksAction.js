import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from "react-notifications";

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const FETCH_HISTORY_REQUEST = 'FETCH_HISTORY_REQUEST';
export const FETCH_HISTORY_SUCCESS = 'FETCH_HISTORY_SUCCESS';
export const FETCH_HISTORY_FAILURE = 'FETCH_HISTORY_FAILURE';

export const SAVE_HISTORY_REQUEST = 'SAVE_HISTORY_REQUEST';
export const SAVE_HISTORY_SUCCESS = 'SAVE_HISTORY_SUCCESS';
export const SAVE_HISTORY_FAILURE = 'SAVE_HISTORY_FAILURE';

export const CREATE_TRACK_REQUEST = 'CREATE_TRACK_REQUEST';
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS';
export const CREATE_TRACK_FAILURE = 'CREATE_TRACK_FAILURE';

export const DELETE_TRACK = 'DELETE_TRACK';
export const deleteTrackSuccess = () => ({type: DELETE_TRACK});

export const fetchTracksRequest = () => ({type: FETCH_TRACKS_REQUEST});
export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});
export const fetchTracksFailure = error => ({type: FETCH_TRACKS_FAILURE, error});

export const fetchHistoryRequest = () => ({type: FETCH_HISTORY_REQUEST});
export const fetchHistorySuccess = history => ({type: FETCH_HISTORY_SUCCESS, history});
export const fetchHistoryFailure = error => ({type: FETCH_HISTORY_FAILURE, error});

export const saveHistoryRequest = () => ({type: SAVE_HISTORY_REQUEST});
export const saveHistorySuccess = () => ({type: SAVE_HISTORY_SUCCESS});
export const saveHistoryFailure = error => ({type: SAVE_HISTORY_FAILURE, error});

export const createTrackRequest = () => ({type: CREATE_TRACK_REQUEST});
export const createTrackSuccess = () => ({type: CREATE_TRACK_SUCCESS});
export const createTrackFailure = error => ({type: CREATE_TRACK_FAILURE, error});

export const PUBLISH_TRACK = 'PUBLISH_TRACK';
export const publishTrackSuccess = () => ({type: PUBLISH_TRACK});

export const fetchTracks = (query, token) => {
    return dispatch => {
        if (!token) {
            dispatch(push('/login'));
        } else {
            dispatch(fetchTracksRequest());
            let url = '/tracks';
            if (query) {url += query;}

            return axios.get(url, {headers: {Authorization: token}})
                .then(
                    response => dispatch(fetchTracksSuccess(response.data)),
                    error => dispatch(fetchTracksFailure(error))
                );
        }
    };
};

export const fetchHistory = (token) => {
    return dispatch => {
        if (!token) {
            dispatch(push('/login'));
        } else {
            dispatch(fetchHistoryRequest());
            let url = '/track_history';
            return axios.get(url, {headers: {Authorization: token}})
                .then(
                    response => dispatch(fetchHistorySuccess(response.data)),
                    error => dispatch(fetchHistoryFailure(error))
                );
        }
    };
};

export const saveHistory = (trackId, token) => {
  return dispatch => {
      if (!token) {
          dispatch(push('/login'));
      }
      dispatch(saveHistoryRequest());
      return axios.post('/track_history', {track: trackId}, {headers: {Authorization: token}}).then(
          () => dispatch(saveHistorySuccess()),
          error => dispatch(saveHistoryFailure(error))
      );
  }
};

export const createTrack = trackData => {
    return dispatch => {
        dispatch(createTrackRequest());
        return axios.post('/tracks', trackData).then(
            () => {
                NotificationManager.success('Track created!');
                dispatch(createTrackSuccess());
                dispatch(push('/'));
            },
            error => dispatch(createTrackFailure(error))
        )
    }
};

export const publishTrack = trackId => {
    return dispatch => {
        const url = '/tracks/' + trackId + '/toggle_publish';
        return axios.post(url).then(
            () => {
                NotificationManager.success('Track published!');
                dispatch(publishTrackSuccess());
                dispatch(push('/'));
            }
        )
    }
};

export const deleteTrack = trackId => {
    return dispatch => {
        return axios.delete('/tracks/' + trackId).then(
            () => {
                NotificationManager.success('Track removed');
                dispatch(deleteTrackSuccess());
                dispatch(push('/'));
            }
        );
    };
};