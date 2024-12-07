const fetchFromTMDB = require('../services/fetchFromTMDB');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError')
const User = require('../models/userModel')

//searchPerson
exports.searchPerson =catchAsync(async (req, res) => {
    const { query } = req.params;
    const response = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if(response.results.length === 0){
        res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].profile_path,
                title: response.results[0].name,
                searchType: "person",
                createdAt: new Date(),
            },
        },
    });


    res.status(200).json({
        status: 'success',
        content: data.results
    });
})

//searchMovie
exports.searchMovie = catchAsync(async (req, res) => {
    const { query } = req.params;
    const response = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if(response.results.length === 0){
        res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].poster_path,
                title: response.results[0].title,
                searchType: "movie",
                createdAt: new Date(),
            },
        },
    });

    res.status(200).json({
        status: 'success',
        content: response.results
    });
})

//searchTv
exports.searchTv = catchAsync(async (req, res) => {
    const { query } = req.params;
    const response = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if(response.results.length === 0){
        res.status(404).send(null);
    }
    await User.findByIdAndUpdate(req.user._id, {
        $push: {
            searchHistory: {
                id: response.results[0].id,
                image: response.results[0].poster_path,
                title: response.results[0].name,
                searchType: "tv",
                createdAt: new Date(),
            },
        },
    });
    res.status(200).json({
        status: 'success',
        content: response.results
    });
})

//getSearchHistory
exports.getSearchHistory = catchAsync(async (req, res) => {
    res.status(200).json({
        status: 'success',
        content: req.user.searchHistory
    });
})
//removeItemFromSearchHistory

exports.removeItemFromSearchHistory = catchAsync(async (req, res) => {
    const { id } = req.params;
    id = parseInt(id);

    await User.findByIdAndUpdate(req.user._id, {
        $pull: {
            searchHistory: { id: id },
        },
    });

    res.status(200).json({ success: true, message: "Item removed from search history" });
})