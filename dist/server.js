'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
  value: true
});

var Server = (function () {
  function Server(configs) {
    for (var _len = arguments.length, middlewares = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      middlewares[_key - 1] = arguments[_key];
    }

    _classCallCheck(this, Server);

    this.configs = configs || {};
    this.env = process.env.NODE_ENV || 'development';

    // Load core dependencies
    try {
      this.app = require('express')();
    } catch (err) {
      throw new Error('Express is required.');
    }
  }

  _createClass(Server, [{
    key: 'models',
    value: function models(fn) {
      if (!this.configs.database) {
        return this;
      } // Inject dependencies
      var deps = this.dependencies;
      deps.define('Schema', databases.mongodb.Schema);
      deps.define('db', databases.mongodb.connect(this.settings.database));
      deps.define('models', deps.use(fn));

      return this;
    }
  }, {
    key: 'routes',
    value: function routes(fn) {
      var app = this.app;
      var deps = this.dependencies;

      // Inject app instance to `fn`
      deps.define('app', this.app);

      // Init custom routes
      deps.use(fn);

      // Init errors routes
      app.use(middlewares.errors.logger);
      app.use(middlewares.errors.xhr);
      app.use(middlewares.errors.common);
      app.all('*', middlewares.errors.notfound); // 404

      return this;
    }
  }, {
    key: 'run',
    value: function run() {
      var app = this.app;
      var log = debug(this.configs.name)('http');

      log('%s is running [%s][%s] @ %s', this.configs.name, app.locals.url, app.get('port'), app.get('env'));

      app.listen(app.get('port'));
    }
  }, {
    key: 'configs',
    get: function () {
      return this.configs;
    }
  }, {
    key: 'port',
    set: function (p) {
      this.app.set('port', p);
      return this;
    }
  }, {
    key: 'env',
    set: function (env) {
      this.env = env;
      this.app.set('env', this.env);
      return this;
    }
  }]);

  return Server;
})();

exports['default'] = Server;
module.exports = exports['default'];