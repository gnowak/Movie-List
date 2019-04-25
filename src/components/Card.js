import React, { Component } from 'react';
import {connect} from 'react-redux';
import { toggleViewed } from '../actions/movieActions';

import './Card.css';


class Card extends Component {
  
  toggleClick = () => {
    this.props.toggleViewed(this.props.id);
  }
  
  render() {
    return (  
      <div className="w-10-l w-20-m w-25-s tc dib">
        <div>
          <h4 className="white">{ this.props.name }</h4>
        </div>
        <div onClick={this.toggleClick} className={ "br3 pa3 ma2 grow bw2 shadow-5 Card" + (this.props.unwatched === true ? " unwatched" : " watched") }>
          <img alt="Movie Poster" src={"https://image.tmdb.org/t/p/w92/" + this.props.poster_path } />
        </div>
      </div>
    )
  }
}
const mapStateToProp = (state, ownProps) =>{
  const {movies} = state;
  const {id} = ownProps
  return({
    unwatched: movies.movies[id].unwatched,
    id: id
  })
}

export default connect(mapStateToProp, { toggleViewed })(Card);