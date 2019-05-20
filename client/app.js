const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser  = require("body-parser");
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
///const methodOverride = require("method-override");

var cors = require("cors")
var bodyParser = require("body-parser")

var homeRouter = require('./server/routes/homeRouter');
var loginRouter = require('./server/routes/loginRouter');
var booksRouter = require('./server/routes/booksRouter');
var profileRouter = require('./server/routes/profileRouter');
var ClubRouter = require('./server/routes/ClubRouter');

var app = express();
var resultado = 0;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());


const host = process.env.HOST || "localhost";
const port = process.env.PORT || "3000";

app.use(express.static(path.join(__dirname, '../app/dist/client')));
app.use(morgan('dev'));
var router = express.Router();

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../app/dist/client/index.html'));
});
app.use('/', homeRouter);
app.use('/', booksRouter);
app.use('/', profileRouter);
app.use('/loginPage', loginRouter);
app.use('/club', ClubRouter);
app.use(router);

app.listen(port, function() {
  console.log("Node server running on http://"+host+":"+port);

});
