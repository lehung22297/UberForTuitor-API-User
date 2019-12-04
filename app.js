const express = require("express");
const bodyParser = require('body-parser');
const passport = require("passport");
var path = require('path');
var cors = require('cors');
require('./middleware/passport');
const app = express();

var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");

  // allow options method work, ask experts for more
  if (req.method === "OPTIONS") {
    return res.status(200).json({});
  }
  next();
};

app.use(allowCrossDomain);

var corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "*");
//   next(); 
// });
//passw mysql: C5f6HMl1wA
require('./routes/account.router')(app);
require('./routes/district.router')(app);


module.exports = app;

