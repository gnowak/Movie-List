import React, { Component } from 'react';
import 'tachyons';
import './App.css';
import CardList from './components/CardList';
import { movies } from './movies';
import axios from 'axios';
import {config} from './config' 

async function fetchMovieInfo () {  
  
  const delay = interval => new Promise(resolve => setTimeout(resolve, interval));
  const sendMessage = async params => {
    await delay(2000);
  
    return axios(params);
  };

  // map through the movies
  const promises = movies.map(movie => {
    // request details from themoviedb's API with Axios
    const response = sendMessage('https://api.themoviedb.org/3/search/movie?api_key='+ config['tmdb-api-key'] +'&language=en-US&page=1&include_adult=false&query=' + ((movie.name === 'The Lord of the Rings Trilogy') ? 'The+Lord+of+the+Rings' : encodeURI(movie.name) ))

    return response;

  })

  // wait until all promises resolve
  const results = await Promise.all(promises)

  // use the results
  console.log(results);

  return (
    results.map((result, i) => {
      return ({
        name: result.data.results.length > 0 ? (result.data.results[0].title === 'The Lord of the Rings: The Fellowship of the Ring' ? 'The Lord of the Rings Trilogy' : result.data.results[0].title ) : '', 
        poster_path: result.data.results.length > 0 ? result.data.results[0].poster_path : '',
        unwatched: true
      })
    })
  )
}

class App extends Component {
  constructor(){
    super();
    this.state = { movieList: [],}
  }
  componentDidMount(){
      const movieList = fetchMovieInfo();
      movieList.then(
        data=>{this.setState({movieList: data})
        console.log(this.state)}
      ).catch(err => {console.log(err, err.stack)})
  }
  render() {
    const {movieList} = this.state;
    
    return (
      <div className="tc App">
        <h1>Movie Randomizer!</h1>
        <CardList movies={ movieList } />
      </div>
    );
  }
}

export default App;
