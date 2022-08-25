"use strict";

const personalMovieDB = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  private: false,
};

function startSurvey() {
  identifyPersonalLvl();
  writeRecentMovies();
  writeYourGenres();
  showMyDB(personalMovieDB);
}

function identifyPersonalLvl() {
  let numberOfFilms;
  numberOfFilms = +prompt("How many movies have you watched?");
  console.log(numberOfFilms);

  while (numberOfFilms <= 0 || isNaN(numberOfFilms) || numberOfFilms === null) {
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

function writeRecentMovies() {
  let moviesGenre, moviesGenreRating;

  for (let i = 0; i < 2; i++) {
    moviesGenre = prompt("One of the last movies you watched?");
    if (moviesGenre === null) {
      break;
    }

    while (moviesGenre.length > 50 || moviesGenre.length <= 0) {
      alert("Invalid name!");
      moviesGenre = prompt("One of the last movies you watched?");
    }

    moviesGenreRating = +prompt("How much would you rate it?");
    if (moviesGenreRating === null) {
      break;
    }

    while (moviesGenreRating <= 0 || isNaN(moviesGenreRating)) {
      alert("Invalid number!");
      moviesGenreRating = +prompt("How much would you rate it?");
    }

    personalMovieDB.movies[moviesGenre] = moviesGenreRating;
  }
}

function writeYourGenres() {
  for (let i = 0; i < 3; i++) {
    let movieGenre = prompt(`What is your favourite movie genre? #${i + 1}`);
    if (movieGenre === null) {
      break;
    }

    while (movieGenre.length > 50 || movieGenre.length <= 0) {
      alert("Invalid name!");
      movieGenre = prompt(`What is your favourite movie genre? #${i + 1}`);
    }

    personalMovieDB.genres.push(movieGenre);
  }
}

function showMyDB(DB) {
  if (DB.private === false) {
    console.log(DB);
  } else {
    console.log("We're sorry, but we can't show you private information.");
  }
}

startSurvey();
