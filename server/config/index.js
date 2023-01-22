require('dotenv').config();

module.exports = {
  maxAge: Number(process.env.COOKIE_MAX_AGE) ?? 1000 * 60 * 60 * 24,
  secret: process.env.SESSION_SECRET,
  clientUrl: process.env.CLIENT_URL,
  port: process.env.PORT || 5151,
  twitter: {
    apiKey: process.env.TWITTER_CONSUMER_KEY,
    secret: process.env.TWITTER_CONSUMER_SECRET,
    callbackUrl: process.env.TWITTER_CALLBACK_URL,
  },
};
