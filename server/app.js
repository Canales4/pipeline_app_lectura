var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');

var cors = require("cors")
var bodyParser = require("body-parser")


var homeRouter = require('./routes/homeRouter');
var loginRouter = require('./routes/loginRouter');
var booksRouter = require('./routes/booksRouter');
var deleteRouter = require('./routes/deleteRouter');
var modifyRouter = require('./routes/modifyRouter');
var ClubRouter = require('./routes/ClubRouter');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({ extended: false })
)

app.use('/', homeRouter);
app.use('/loginPage', loginRouter);
app.use('/books', booksRouter);
app.use('/club', ClubRouter);

module.exports = app;