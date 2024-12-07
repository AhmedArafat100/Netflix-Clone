const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const movieRouter = require('./routes/movieRouter');
const searchRouter = require('./routes/searchRouter');
const TvRouter = require('./routes/TvRouter');
require('dotenv').config();



app.use(express.json())
app.use(cookieParser()); // allows us to parse incoming cookies

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/movie',movieRouter);
app.use('/api/v1/search',searchRouter);
app.use('/api/v1/tv',TvRouter);






mongoose
.connect(process.env.MONGO_URL, {
     useNewUrlParser: true,
     useUnifiedTopology: true
 })
 .then(() => console.log('DB connection successful!'));



const port = process.env.PORT || 3000;


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})