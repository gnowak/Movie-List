const express = require('express');
const router = express.Router();
const axios = require('axios');
const firebase = require("firebase");
var admin = require('firebase-admin');
const api = require('../config/api.js');
const dbCredentials = require('../config/db.js');

firebase.initializeApp(dbCredentials.config);
var database = firebase.database();

const baseURL = "https://api.themoviedb.org/3/search/movie?api_key=" + api.tmdbApiKey + "&language=en-US&page=1&include_adult=false&query="

let movieArray = [];
let promises = []; 
var movieList =[];

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  database.ref('movie-list').once('value').then((snapshot)=>{
    //receive list of movies from database reference
    movieList = (snapshot.val());
    //create map of axios get promises with 500ms delay between each to avoid API rate limit
    let promises = movieList.map((movie, idx) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => 
          axios.get(baseURL + encodeURIComponent(movie.name))
                .then(res=>resolve(res))
                .catch(err => reject(err)), 500*idx)  
      });
    })
  
    //Run through all promises and then process the results
    Promise.all(promises).then((results)=>{results.forEach(
      (response)=>{
        tempMovie = {}
        if(response.data.results.length){
          tempMovie.name = response.data.results[0].title ;
          tempMovie.tmdbId = response.data.results[0].id;
          tempMovie.img = response.data.results[0].poster_path ;
          tempMovie.overview = response.data.results[0].overview ;
          tempMovie.releaseDate = response.data.results[0].release_date ;
        }
        else {
          tempMovie.name = decodeURI(response.config.url.split('&query=')[1]);
          tempMovie.tmdbId = "";
          tempMovie.img = "" ;
          tempMovie.overview = "" ;
          tempMovie.releaseDate = "" ;
        }
        movieArray.push(tempMovie);
        console.log("Movie Name: ", tempMovie.name)
      });
      //Add entries to the database with all downloaded information from the movie database API   
      database.ref('movies').set(movieArray, (error)=>{if(error) console.log("ERROR: ", error); else console.log("stored");});
      res.send(movieArray);
    })
    .catch((error)=>console.log(error))
  });
});

module.exports = router;
