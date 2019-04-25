import React, { Component } from 'react'
import { connect } from 'react-redux'
import { randomUnwatched } from '../actions/movieActions';
import './RandomCard.css'

export class RandomCard extends Component {
    
    handleClick = () => {
        this.props.randomUnwatched()
    }
    
    componentDidMount() {
        if(this.props.movies.length > 0){
            this.props.randomUnwatched();
        }  
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps, this.props)
        if(prevProps.movies.filter((movie)=> movie.unwatched === true ).length === 0  &&  this.props.movies.filter((movie)=> movie.unwatched === true ).length > 0){
            this.props.randomUnwatched()
        }
    }
    
    
    render() {  
        const unwatchedCount = this.props.movies.filter((movie)=> movie.unwatched === true ).length

        return (
            unwatchedCount > 0 ?
            <div className="w-30-l tc dib">
                <div>
                    <h4 className="white">{ this.props.random.name }</h4>
                </div>
                <div className={ "br3 pa3 ma2 bw2 shadow-5 Card random-card" }>
                    <img alt="Movie Poster" src={"https://image.tmdb.org/t/p/w185/" + this.props.random.poster_path } />
                </div>
                <button onClick={this.handleClick}>
                    Random!
                </button>
            </div>
            : <h2>YOU'VE WATCHED THEM ALL?!?!?!?!?!?</h2>
        )
    }
}

const mapStateToProps = (state) =>{
    const {movies} = state;
    return({
      random: movies.random,
      movies: movies.movies
    })
  }

export default connect(mapStateToProps, {randomUnwatched})(RandomCard)
