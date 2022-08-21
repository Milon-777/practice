"use strict";

const numberOfFilms = +prompt("How many movies have you watched?");
console.log(numberOfFilms);

const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  private: false,
};

const lastMovie1 = prompt("One of the last movies you watched?"),
  lastMovieRating1 = +prompt("How much would you rate it?"),
  lastMovie2 = prompt("One of the last movies you watched?"),
  lastMovieRating2 = +prompt("How much would you rate it?");
personalMovieDB.movies[lastMovie1] = lastMovieRating1;
personalMovieDB.movies[lastMovie2] = lastMovieRating2;
console.log(personalMovieDB);
