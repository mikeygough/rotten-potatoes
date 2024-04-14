// express -----------------
const express = require('express');
const app = express();

// handlebars -----------------
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

// mongoose -----------------
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes', {
  useNewUrlParser: true,
});

const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
});

// mock data -----------------
// let reviews = [
//   { title: 'Great Review', movieTitle: 'Batman II' },
//   { title: 'Awesome Movie', movieTitle: 'Titanic' },
// ];

// routes -----------------
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

// server -----------------
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
