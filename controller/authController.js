const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const createSendToken = require('../utils/createSendToken');

exports.signup = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        return next(new AppError('Please provide username, email and password!', 400));
    }
  const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {  
    const { email, password } = req.body;
    
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password!', 401));


    }
    createSendToken(user, 200, res);


})

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ status: 'success' });
    
}