import React, { Component } from 'react'
import './Card.css';


export default class Card extends Component {
  constructor(props){
    super(props);
    this.state = { unwatched: this.props.unwatched }
    
    this.handleClick = this.handleClick.bind(this);

  }
  
  handleClick = () => {
    this.setState(state=>({
      unwatched: !state.unwatched
    }));
  }
  
  render() {
    return (  
      <div className="w-10-l w-20-m w-25-s tc dib">
        <div>
          <h4 className="white">{ this.props.name }</h4>
        </div>
        <div onClick={this.handleClick} className={ "br3 pa3 ma2 grow bw2 shadow-5 Card" + (this.state.unwatched === true ? " unwatched" : " watched") }>
          <img alt="Movie Poster" src={"https://image.tmdb.org/t/p/w92/" + this.props.poster_path } />
        </div>
      </div>
    )
  }
}