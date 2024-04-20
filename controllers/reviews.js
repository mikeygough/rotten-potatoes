const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = function (app) {
  // INDEX
  app.get('/', (req, res) => {
    Review.find()
      .then((reviews) => {
        // executed when the promise resolves
        res.render('reviews-index', { reviews: reviews });
      })
      .catch((err) => {
        // executed if the promise is rejected
        console.log(err);
      });
  });

  // NEW
  app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', { title: 'New Review' });
  });

  // CREATE
  app.post('/reviews', (req, res) => {
    Review.create(req.body)
      .then((review) => {
        console.log(review);
        res.redirect(`/reviews/${review._id}`); // Redirect to reviews/:id
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // SHOW
  app.get('/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id)
      .then((review) => {
        // fetch its comments
        Comment.find({ reviewId: req.params.id }).then((comments) => {
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
  app.get('/reviews/:id/edit', (req, res) => {
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
  app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
      .then((review) => {
        res.redirect(`/reviews/${review._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // DELETE
  app.delete('/reviews/:id', function (req, res) {
    Review.findOneAndDelete({ _id: req.params.id })
      .then((review) => {
        if (!review) {
          return res.status(404).send('Review not found');
        }
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send('Error deleting review');
      });
  });
};
