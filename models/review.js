const mongoose = require('mongoose');
const Comment = require('../models/comment');

const reviewSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    movieTitle: String,
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
