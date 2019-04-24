import {config} from './config'  

export const apiCall = (movie) => fetch('https://api.themoviedb.org/3/search/movie?api_key='+ config['tmdb-api-key'] +'&language=en-US&page=1&include_adult=false&query=' + ((movie.name === 'The Lord of the Rings Trilogy') ? 'The+Lord+of+the+Rings' : encodeURI(movie.name) ));