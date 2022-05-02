var createError = require('http-errors');
var express = require('express');
var cors = require('cors')
const cookieParser = require('cookie-parser');
const mongoose = require('./database/mongoose');
const expressJwt = require('express-jwt');
const JWT_SECRET = 'DFDKNDKJNFNEFKRNNIi#$$##LKFIVFNVKFNV';
var app = express();
app.use(cors());

// const checkIfAuthenticated = expressJwt.expressjwt({
//   secret: JWT_SECRET
// }); 
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var dashboardRouter = require('./routes/dashboard');

app.use(cookieParser());
app.use(express.json());
app.use('/login',  loginRouter);
app.use('/signup', signupRouter);
app.use('/dashboard' , dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('no page found');
});

module.exports = app;