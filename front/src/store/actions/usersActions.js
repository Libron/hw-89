import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from 'react-notifications';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

export const logoutUserRequest = () => ({type: LOGOUT_USER});

const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const registerUser = userData => {
    return dispatch => {
      return axios.post('/users', userData).then(
          () => {
              dispatch(registerUserSuccess());
              dispatch(push('/'));
          },
          error => {
              if (error.response) {
                  dispatch(registerUserFailure(error.response.data))
              } else {
                  dispatch(registerUserFailure({global: 'No connection'}))
              }
          }
      )
    };
};

export const loginUser = userData => {
  return dispatch => {
      return axios.post('users/sessions', userData).then(
        response => {
            dispatch(loginUserSuccess(response.data.user));
            dispatch(push('/'));
        },
        error => {
            if (error.response) {
                dispatch(loginUserFailure(error.response.data))
            } else {
                dispatch(loginUserFailure({global: 'No connection'}))
            }
        }
      );
  };
};

export const logoutUser = () => {
    return dispatch => {
        dispatch(logoutUserRequest());
        dispatch(push('/login'));
    };
};

export const facebookLogin = userData => {
    return dispatch => {
        return axios.post('/users/facebookLogin', userData).then(
            response => {
                dispatch(loginUserSuccess(response.data.user));
                NotificationManager.success('Loggend in via Facebook');
                dispatch(push('/'));
            },
            () => {
                dispatch(loginUserFailure('Login via Facebook failed'));
            }
        )
    }
};