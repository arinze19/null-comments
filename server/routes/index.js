const AuthRoute = require('./AuthRoutes');

class Routes {
  static route(router) {
    AuthRoute.route(router);

    return router;
  }
}

module.exports = Routes;
