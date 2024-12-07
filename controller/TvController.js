const fetchFromTMDB = require('../services/fetchFromTMDB');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError')
const User = require('../models/userModel')


//getTrendingTv
exports.getTrendingTv = catchAsync(async (req, res) => {
    const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, content: randomMovie });
})


//getTvTrailers
exports.getTvTrailers = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
    res.status(200).json({ success: true, trailers: data.results });
})


//getTvDetails
exports.getTvDetails = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
    res.status(200).json({ success: true, content: data });
})

//getSimilarTvs
exports.getSimilarTvs = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
    res.status(200).json({ success: true, similar: data.results });
})




//getTvsByCategory
exports.getTvsByCategory = catchAsync(async (req, res) => {
    const { category } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
    res.status(200).json({ success: true, content: data.results });
})