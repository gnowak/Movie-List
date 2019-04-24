import { FETCH_MOVIE, TOGGLE_VIEWED } from '../actions/types';

const intialState = {
    movies: []
}

export default function(state = intialState, action) {
    switch(action.type) {
        case FETCH_MOVIE:
            return {
                ...state,
                movies: action.payload
            }
        case TOGGLE_VIEWED:
            return {movies: state.movies.map((movie, i) => i === action.payload ? {...movie, unwatched: !movie.unwatched}: movie)}
        default:
            return state;

    }
}