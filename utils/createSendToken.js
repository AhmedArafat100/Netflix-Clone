const jwt = require('jsonwebtoken');


function createSendToken(user,statusCode,res) {
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
    const expiresIn = new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000);
    const cookieOptions = {
        expires:expiresIn,
        httpOnly:true
    }
    res.cookie('jwt',token,cookieOptions);
    
    user.password = undefined;

    res.status(statusCode).json({
        status:"success",
        token,
        data:{
            user
        }
    })
    
}
module.exports = createSendToken;