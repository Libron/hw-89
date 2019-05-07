import {CREATE_ARTIST_FAILURE, FETCH_ARTISTS_FAILURE, FETCH_ARTISTS_SUCCESS} from "../actions/artistsActions";

const initialState = {
    artists: [],
    error: null
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTISTS_SUCCESS:
            return {...state, artists: action.artists};
        case FETCH_ARTISTS_FAILURE:
            return {...state, error: action.error};
        case CREATE_ARTIST_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default artistsReducer;