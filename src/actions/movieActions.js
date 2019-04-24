import { FETCH_MOVIE, FETCH_MOVIE_PENDING, TOGGLE_VIEWED } from './types.js'
import { apiCall } from '../api/api';
import {movies} from '../movies';

async function stall(stallTime = 3000) {
    await new Promise(resolve => setTimeout(resolve, stallTime));
}


export const fetchMovie = () => async (dispatch) => {
    dispatch({type: FETCH_MOVIE_PENDING})

    const movieList = movies.map(async (movie, i)=>{
        await stall(250*i)
        return await apiCall(movie)
        .then(res=>res.json())
        .then(async data=>{
            return {
                name: ( data.results && data.results.length > 0) ? ( data.results[0].title === 'The Lord of the Rings: The Fellowship of the Ring' ? 'The Lord of the Rings Trilogy' : data.results[0].title ) : '', 
                poster_path: ( data.results && data.results.length > 0) ? data.results[0].poster_path : '',
                unwatched: true
            }
        })
    })
    const results = await Promise.all(movieList);  
    return ( dispatch({
        type: FETCH_MOVIE,
        payload: results
    }));
}

export function toggleViewed(id) {
    return (dispatch) => (dispatch({
        type: TOGGLE_VIEWED,
        payload: id
    }))

}
