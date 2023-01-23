const express = require('express');
const session = require('express-session');
// const cookieSession = require('cookie-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const router = express.Router();

const passportStrategy = require('./strategy/twitter');
const config = require('./config');
const Routes = require('./routes');

app.use(cookieParser());

app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: config.maxAge,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use('/auth', Routes.route(router));

app.get('/', (req, res) => {
  console.log(req.user);
  res.json('hello world');
});

app.listen(config.port, () =>
  console.log(`Now listening on port ${config.port}`)
);
