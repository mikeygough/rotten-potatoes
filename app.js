// express ----------------------------------
const express = require('express');
const app = express();

// handlebars ----------------------------------
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

app.engine(
  'handlebars',
  engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
      ifEquals: function (arg1, arg2, options) {
        return arg1 === arg2
          ? options.fn(this)
          : options.inverse(this);
      },
    },
  })
);
app.set('view engine', 'handlebars');

// mongoose ----------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {
  useNewUrlParser: true,
});

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
});

// body-parser ----------------------------------
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// method-override ----------------------------------
const methodOverride = require('method-override');
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

// mock data ----------------------------------
// let reviews = [
//   { title: 'Great Review', movieTitle: 'Batman II' },
//   { title: 'Awesome Movie', movieTitle: 'Titanic' },
// ];

// routes ----------------------------------
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
  Review.findById(req.params.id)
    .then((review) => {
      res.render('reviews-show', { review: review });
    })
    .catch((err) => {
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

// server ----------------------------------
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
