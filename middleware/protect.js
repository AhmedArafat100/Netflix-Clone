const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const{promisify} = require('util');
const jwt = require('jsonwebtoken');

exports.protect =catchAsync(async(req, res, next) => {

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }

    if(!token){
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
    //verfication token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const freshUser = await User.findById(decoded.id);

    if(!freshUser){
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    req.user=freshUser;
    next();


})