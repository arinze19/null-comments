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
    router.route('/login/success').get((req, res) => {
      if (!req.user) {
        res.status(401).json({
          message: 'user cannot be authenticated',
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'user authenticated successfully',
          user: req.user,
          cookies: req.cookies,
        });
      }
    });
    router.route('/login/failed').get((req, res) => {
      res.json({
        success: false,
        message: 'user could not be authenticated',
      });
    });
    router.route('/logout').get((req, res) => {
      req.logout();
      res.redirect(config.clientUrl);
    });
  }
}

module.exports = AuthRoute;
