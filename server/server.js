const express = require('express');
// const ExpressSession = require('express-session');
const session = require('cookie-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const router = express.Router();

const passportStrategy = require('./strategy');
const config = require('./config');
const Routes = require('./routes');

app.use(cookieParser());

app.use(
  session({
    name: 'arinze-session',
    keys: ['some-secret'],
    maxAge: config.maxAge,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use('/auth', Routes.route(router));

app.get('/', (req, res) => {
  res.json('hello world');
});

app.listen(config.port, () =>
  console.log(`Now listening on port ${config.port}`)
);
