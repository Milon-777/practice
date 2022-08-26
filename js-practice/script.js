"use strict";

const personalMovieDB = {
  count: 0,
  movies: {},
  actors: {},
  genres: [],
  private: false,
  identifyPersonalLvl: () => {
    personalMovieDB.count = +prompt("How many movies have you watched?");
    console.log(personalMovieDB.count);

    while (
      personalMovieDB.count <= 0 ||
      isNaN(personalMovieDB.count) ||
      personalMovieDB.count === null
    ) {
      alert("Invalid number!");
      personalMovieDB.count = +prompt("How many movies have you watched?");
    }

    if (personalMovieDB.count < 10) {
      alert("you have watched very few movies.");
    } else if (personalMovieDB.count <= 30) {
      alert("You`re a classic spectator!");
    } else {
      alert("You're a cinephile!");
    }
  },
  writeRecentMovies: () => {
    let movie, movieRating;

    for (let i = 0; i < 2; i++) {
      movie = prompt("One of the last movies you watched?").trim();
      if (movie === null) {
        break;
      }

      while (movie.length > 50 || movie.length <= 0) {
        alert("Invalid name!");
        movie = prompt("One of the last movies you watched?").trim();
      }

      movieRating = +prompt("How much would you rate it?");

      if (movieRating === null) {
        break;
      }

      while (movieRating <= 0 || isNaN(movieRating)) {
        alert("Invalid number!");
        movieRating = +prompt("How much would you rate it?");
      }

      personalMovieDB.movies[movie] = movieRating;
    }
  },
  writeYourGenres: () => {
    for (let i = 0; i < 3; i++) {
      let movieGenre = prompt(`What is your favourite movie genre? #${i + 1}`);
      while (movieGenre === null) {
        alert("Please, write your favourite movie genre!");
        movieGenre = prompt(`What is your favourite movie genre? #${i + 1}`);
      }

      while (movieGenre.length > 50 || movieGenre.length <= 0) {
        alert("Invalid name!");
        movieGenre = prompt(`What is your favourite movie genre? #${i + 1}`);
      }

      personalMovieDB.genres.push(movieGenre);
    }

    personalMovieDB.genres.forEach((elem, i) => {
      console.log(`Favorite genre #${i + 1} is ${elem}`);
    });
  },
  showMyDB: () => {
    if (personalMovieDB.private === false) {
      console.log(personalMovieDB);
    } else {
      console.log("We're sorry, but we can't show you private information.");
    }
  },
  toggleVisibleMyDB: () => {
    personalMovieDB.private = !personalMovieDB.private;
  },
};

function startSurvey() {
  personalMovieDB.identifyPersonalLvl();
  personalMovieDB.writeRecentMovies();
  personalMovieDB.writeYourGenres();
  personalMovieDB.showMyDB();
}

startSurvey();
