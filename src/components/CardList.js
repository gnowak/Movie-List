import React from 'react';
import Card from './Card';

const CardList = ({movies}) => {

  return (
    <div>
      { 
        movies.map( (movie, i) => {
          return ( 
            <Card 
              key={i}
              name={movies[i].name}
              poster_path={movies[i].poster_path}
              unwatched={movies[i].unwatched} 
            />);
        }) 
      }
    </div>
    )
}

export default CardList;