require('dotenv').config();

module.exports = function (app) {
  const { MovieDb } = require('moviedb-promise');
  // const moviedb = new MovieDb('0d3489c55fa0efcc4b91979110fe67cc');
  const moviedb = new MovieDb(process.env.MOVIEDB_API_KEY);

  app.get('/', (req, res) => {
    moviedb
      .movieNowPlaying()
      .then((response) => {
        res.render('movies-index', { movies: response.results });
      })
      .catch(console.error);
  });
};
