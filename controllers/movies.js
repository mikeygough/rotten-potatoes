require('dotenv').config();

module.exports = function (app) {
  const { MovieDb } = require('moviedb-promise');
  // const moviedb = new MovieDb('0d3489c55fa0efcc4b91979110fe67cc');
  const moviedb = new MovieDb(process.env.MOVIEDB_API_KEY);

  // HOME
  app.get('/', (req, res) => {
    moviedb
      .movieNowPlaying()
      .then((response) => {
        res.render('movies-index', { movies: response.results });
      })
      .catch(console.error);
  });

  // SHOW
  app.get('/movies/:id', (req, res) => {
    moviedb
      .movieInfo({ id: req.params.id })
      .then((movie) => {
        moviedb
          .movieVideos({ id: req.params.id })
          .then((videos) => {
            const trailer = videos.results.find(
              (video) => video.type === 'Trailer'
            );
            if (trailer) {
              movie.trailer_youtube_id = trailer.key;
            }

            res.render('movies-show', { movie: movie });
          })
          .catch(console.error);
      })
      .catch(console.error);
  });
};
