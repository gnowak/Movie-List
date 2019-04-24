import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie } from './actions/movieActions';
import 'tachyons';
import './App.css';
import CardList from './components/CardList';
import Card from './components/Card';
import Scroll from './components/Scroll'
import fetchMovieInfo from './tools/utility';



class App extends Component {

  render() {
    return (
      <div className="tc App">
        <h1 style={{ height: '20%' }} >Movie Randomizer!</h1>
        {/* {
          movieList.length === 0 ? <h2 className="white">Loading...</h2> : 
          <Card 
            name={movieList[0].name}
            poster_path={movieList[0].poster_path}
          />
        } */}
        <Scroll>
          <CardList />
        </Scroll>
      </div>
    );
  }
}

export default App;
