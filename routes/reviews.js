const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review')
const Campground = require('../models/campground');
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const reviews = require('../controller/reviews')


router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReviews))

module.exports = router;