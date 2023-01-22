const passport = require('passport');
const config = require('../config');

class AuthRoute {
  static route(router) {
    router.route('/twitter').get(passport.authenticate('twitter'));
    router.route('/twitter/callback').get(
      passport.authenticate('twitter', {
        failWithError: true,
        successRedirect: config.clientUrl,
      })
    );
  }
}

module.exports = AuthRoute;
