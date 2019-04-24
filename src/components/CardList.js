import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovie } from '../actions/movieActions';

import './CardList.css';

import Card from './Card';

class CardList extends Component{
  componentDidMount() {
    this.props.fetchMovie();
  }
  

  render() {
    const movieItems = this.props.movies.map( (movie, i) => {
      return ( 
        <Card 
          key={i}
          id={i}
          name={this.props.movies[i].name}
          poster_path={this.props.movies[i].poster_path}
          unwatched={this.props.movies[i].unwatched} 
        />);
    }) 
    return (
      <div>
        {movieItems.length ? movieItems : <div className="lds-dual-ring"></div>}
      </div>
    )
  }
}

const mapStateToProp = state =>({
  movies: state.movies.movies
})

export default connect(mapStateToProp, { fetchMovie })(CardList);