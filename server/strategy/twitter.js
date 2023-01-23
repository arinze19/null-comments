const path = require('node:path');
const fs = require('node:fs');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const config = require('../config/index');

const dbpath = path.join(__dirname, 'db.json');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  if (!fs.existsSync(dbpath)) {
    fs.writeFileSync(dbpath, JSON.stringify({ users: [] }));
  }

  const db = JSON.parse(fs.readFileSync(dbpath, { encoding: 'utf-8' }));

  let user = db.users.find((item) => item.id === id);
  console.log(user, 'From deserialize');

  if (!user) {
    done(new Error('Failed to deserialize'));
  }

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
      if (!fs.existsSync(dbpath)) {
        fs.writeFileSync(dbpath, JSON.stringify({ users: [], tokens: [] }));
      }

      const db = JSON.parse(fs.readFileSync(dbpath, { encoding: 'utf-8' }));

      let user = db.users.find((item) => item.id === profile.id);

      if (!user) {
        user = {
          id: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          token,
          secret,
        };

        db.users.push(user);
        fs.writeFileSync(dbpath, JSON.stringify(db));
      }

      done(null, user);
    }
  )
);
