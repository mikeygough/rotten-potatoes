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
mongoose.connect('mongodb://localhost/rotten-potatoes');

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
// refactored into controllers
const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);
const movies = require('./controllers/movies')(app);

// server ----------------------------------
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

module.exports = app;
