const express = require('express');
const searchController = require('../controller/searchController');
const router = express.Router();


router.get("/person/:query",searchController.searchPerson);
router.get("/movie/:query", searchController.searchMovie);
router.get("/tv/:query", searchController.searchTv);

router.get("/history", searchController.getSearchHistory);

router.delete("/history/:id", searchController.removeItemFromSearchHistory);




module.exports = router;    