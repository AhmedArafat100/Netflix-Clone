const express = require('express');
const movieController = require('../controller/movieController');
const router = express.Router();


router.get('/trending',movieController.getTrendingMovie);
router.get("/:id/trailers",movieController.getMovieTrailers);
router.get("/:id/details",movieController.getMovieDetails);
router.get("/:id/similar", movieController.getSimilarMovies);
router.get("/:category", movieController.getMoviesByCategory);




module.exports = router;    