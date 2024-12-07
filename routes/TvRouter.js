const express = require('express');
const TvController = require('../controller/TvController');
const router = express.Router();


router.get("/trending", TvController.getTrendingTv);
router.get("/:id/trailers", TvController.getTvTrailers);
router.get("/:id/details", TvController.getTvDetails);
router.get("/:id/similar", TvController.getSimilarTvs);
router.get("/:category", TvController.getTvsByCategory);




module.exports = router;    