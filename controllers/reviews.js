const Review = require('../models/review');
const Comment = require('../models/comment');
// help with formatting timestamps
const moment = require('moment');

module.exports = function (app) {
  // INDEX
  // app.get('/', (req, res) => {
  //   Review.find()
  //     .then((reviews) => {
  //       // executed when the promise resolves
  //       res.render('reviews-index', { reviews: reviews });
  //     })
  //     .catch((err) => {
  //       // executed if the promise is rejected
  //       console.log(err);
  //     });
  // });

  // NEW
  app.get('/movies/:movieId/reviews/new', (req, res) => {
    res.render('reviews-new', { movieId: req.params.movieId });
  });

  // CREATE
  app.post('/movies/:movieId/reviews', (req, res) => {
    console.log(req.body);
    Review.create(req.body)
      .then((review) => {
        console.log(review);
        res.redirect(`/movies/${review.movieId}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // SHOW
  app.get('/movies/:movieId/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id)
      .then((review) => {
        let createdAt = review.createdAt;
        createdAt = moment(createdAt).format(
          'MMMM Do YYYY, h:mm:ss a'
        );
        review.createdAtFormatted = createdAt;
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).then((comments) => {
          comments.reverse();
          // respond with the template with both values
          res.render('reviews-show', {
            review: review,
            comments: comments,
          });
        });
      })
      .catch((err) => {
        // catch errors
        console.log(err.message);
      });
  });

  // EDIT
  app.get('/movies/:movieId/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id)
      .then((review) => {
        res.render('reviews-edit', {
          review: review,
          title: 'Edit Review',
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error retrieving review');
      });
  });

  // UPDATE
  app.put('/movies/:movieId/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then((review) => {
        res.redirect(
          `/movies/${review.movieId}/reviews/${review._id}`
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // DELETE
  app.delete('/movies/:movieId/reviews/:id', function (req, res) {
    Review.findOneAndDelete({ _id: req.params.id })
      .then((review) => {
        if (!review) {
          return res.status(404).send('Review not found');
        }
        res.redirect(`/movies/${review.movieId}`);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send('Error deleting review');
      });
  });
};
