import { FETCH_MOVIE, TOGGLE_VIEWED, RANDOM_UNWATCHED_MOVIE } from '../actions/types';

const intialState = {
    movies: [],
    random:{}
}

export default function(state = intialState, action) {
    switch(action.type) {
        case FETCH_MOVIE:
            return {
                ...state,
                movies: action.payload
            }
        case TOGGLE_VIEWED:
            return {...state, movies: state.movies.map((movie, i) => i === action.payload ? {...movie, unwatched: !movie.unwatched}: movie)}
        case RANDOM_UNWATCHED_MOVIE:
            let randomMovie =  state.movies.filter(movie => movie.unwatched === true);
            console.log("Unwatched Movies remaining", randomMovie)
            return {...state, random: randomMovie[[Math.floor(Math.random() * randomMovie.length)]]}
        default:
            return state;

    }
}