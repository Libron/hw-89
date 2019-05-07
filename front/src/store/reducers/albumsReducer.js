import {CREATE_ALBUM_FAILURE, FETCH_ALBUMS_FAILURE, FETCH_ALBUMS_SUCCESS} from "../actions/albumsActions";

const initialState = {
    albums: [],
    error: null
};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ALBUMS_SUCCESS:
            return {...state, albums: action.albums};
        case FETCH_ALBUMS_FAILURE:
            return {...state, error: action.error};
        case CREATE_ALBUM_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default albumsReducer;