import {
    CREATE_TRACK_FAILURE,
    FETCH_HISTORY_FAILURE,
    FETCH_HISTORY_SUCCESS,
    FETCH_TRACKS_FAILURE,
    FETCH_TRACKS_SUCCESS
} from "../actions/tracksAction";

const initialState = {
    tracks: [],
    error: null,
    history: []
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRACKS_SUCCESS:
            return {...state, tracks: action.tracks};
        case FETCH_TRACKS_FAILURE:
            return {...state, error: action.error};
        case FETCH_HISTORY_SUCCESS:
            console.log(action.history);
            return {...state, history: action.history};
        case FETCH_HISTORY_FAILURE:
            return {...state, error: action.error};
        case CREATE_TRACK_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default tracksReducer;


