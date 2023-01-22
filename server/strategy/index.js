const path = require('node:path');
const fs = require('node:fs');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const config = require('../config/index');

// mock db
const dbpath = path.join(__dirname, 'db.json');
if (!fs.existsSync(dbpath)) {
  fs.writeFileSync(dbpath, JSON.stringify({ users: [] }));
}

passport.serializeUser((user, done) => {
  const db = JSON.parse(fs.readFileSync(dbpath, { encoding: 'utf-8' }));
  const exists = db.users.find((item) => user.id === item.id);

  if (!exists) {
    db.users.push(user);
    fs.writeFileSync(dbpath, JSON.stringify(db));
  }

  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: config.twitter.apiKey,
      consumerSecret: config.twitter.secret,
      callbackURL: config.twitter.callbackUrl,
    },
    async (token, secret, profile, done) => {
      const db = JSON.parse(fs.readFileSync(dbpath, { encoding: 'utf-8' }));

      const user = {
        id: profile.id,
        username: profile.username,
        displayName: profile.displayName,
      };
      const exists = db.users.find((item) => user.id === item.id);

      if (!exists) {
        db.users.push(user);
        fs.writeFileSync(dbpath, JSON.stringify(db));
      }

      done(null, user);
    }
  )
);
