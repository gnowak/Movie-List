import React, { Component } from 'react';
import { connect } from 'react-redux';

import 'tachyons';
import './App.css';

import { fetchMovie } from './actions/movieActions'

import CardList from './components/CardList';
import Card from './components/Card';
import Scroll from './components/Scroll'
import RandomCard from './components/RandomCard';


class App extends Component {

  componentDidMount() {
    console.log('fetching');
    this.props.fetchMovie();
  }
  

  render() {
    return (
      <div className="tc App">
        <h1 style={{ height: '20%' }} >Movie Randomizer!</h1>
        {this.props.movies.length > 0 ? <RandomCard /> : console.log("Still no movies: ", this.props)}
        <Scroll>
          <CardList />
        </Scroll>
      </div>
    );
  }
}

const mapStateToProp = (state) =>{
  const {movies} = state;
  return({
    movies: movies.movies,
  })
}

export default connect(mapStateToProp, { fetchMovie })(App);
