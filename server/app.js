
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var events = require('./routes/events');
var privateEvents = require('./routes/privateEvents');
var logout = require('./routes/logout');
var event = require('./routes/event');
var comments = require('./routes/comments');

var app = express();
const PORT = process.env.PORT || 5000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.use(cookieSession({
  name: 'session',
  // use environment variables to store secure information
  keys: [process.env.KEY_ONE, process.env.KEY_TWO, process.env.KEY_THREE]
}));

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/events', events);
app.use('/privateEvents', privateEvents);
app.use('/logout', logout);
app.use('/event', event);
app.use('/comments', comments);

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});


app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});


module.exports = app;
