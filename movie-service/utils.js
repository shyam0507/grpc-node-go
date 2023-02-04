const fs = require("fs");

const getMovie = (movieId) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      "./data/movies.json",
      { encoding: "utf8", flag: "r" },
      async function (err, data) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          const movies = JSON.parse(data);
          console.log("Movie List ", movies);
          for (let i = 0; i < movies.length; i++) {
            if (movies[i].id == movieId) {
              return resolve(movies[i]);
            }
          }
        }
      }
    );
  });
};

module.exports = getMovie;
