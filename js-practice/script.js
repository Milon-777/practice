"use strict";

const personalMovieDB = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  private: false,
};

let lastMovie, lastMovieRating, numberOfFilms;

for (let i = 0; i < 2; i++) {
  if (i === 0) {
    numberOfFilms = +prompt("How many movies have you watched?");
    console.log(numberOfFilms);

    while (numberOfFilms <= 0 || isNaN(numberOfFilms)) {
      alert("Invalid number!");
      numberOfFilms = +prompt("How many movies have you watched?");
    }
    personalMovieDB.count = numberOfFilms;

    if (personalMovieDB.count < 10) {
      alert("you have watched very few movies.");
    } else if (personalMovieDB.count <= 30) {
      alert("You`re a classic spectator!");
    } else {
      alert("You're a cinephile!");
    }
  }

  lastMovie = prompt("One of the last movies you watched?");
  if (lastMovie === null) {
    break;
  }

  while (lastMovie.length > 50 || lastMovie.length <= 0) {
    alert("Invalid name!");
    lastMovie = prompt("One of the last movies you watched?");
  }

  lastMovieRating = +prompt("How much would you rate it?");
  if (lastMovieRating === null) {
    break;
  }

  while (lastMovieRating <= 0 || isNaN(lastMovieRating)) {
    alert("Invalid number!");
    lastMovieRating = +prompt("How much would you rate it?");
  }

  personalMovieDB.movies[lastMovie] = lastMovieRating;
}

console.log(personalMovieDB);
