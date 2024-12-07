const fetchFromTMDB = require('../services/fetchFromTMDB');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getTrendingMovie = catchAsync(async (req, res) => {
    const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({
        status: 'success',
        content:randomMovie
    });
});


//getMovieTrailers
exports.getMovieTrailers = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    res.status(200).json({
        status: 'success',
        trailers: data.results
    });
});

//getMovieDetails
exports.getMovieDetails = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    res.status(200).json({
        status: 'success',
        content: data
    });
})

//getSimilarMovies
exports.getSimilarMovies = catchAsync(async (req, res) => {
    const { id } = req.params;

    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
    res.status(200).json({ success: true, similar: data.results });
})
//getMoviesByCategory

exports.getMoviesByCategory = catchAsync(async (req, res) => {
    const { category } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
    res.status(200).json({ success: true, content: data.results });
})

