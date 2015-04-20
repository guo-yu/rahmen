class Server {
  constructor(configs, ...middlewares) {
    this.configs = configs || {}
    this.env = process.env.NODE_ENV || 'development'

    // Load core dependencies
    try {
      this.app = require('express')()
    } catch (err) {
      throw new Error('Express is required.')
    }
  }

  models(fn) {
    if (!this.configs.database)
      return this;

    // Inject dependencies
    var deps = this.dependencies;
    deps.define('Schema', databases.mongodb.Schema);
    deps.define('db', databases.mongodb.connect(this.settings.database));
    deps.define('models', deps.use(fn));

    return this;
  }

  routes(fn) {
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

  run() {
    var app = this.app;
    var log = debug(this.configs.name)('http');

    log(
      '%s is running [%s][%s] @ %s', 
      this.configs.name, 
      app.locals.url,
      app.get('port'),
      app.get('env')
    );

    app.listen(app.get('port'))
  }

  get configs() {
    return this.configs
  }

  set port(p) {
    this.app.set('port', p)
    return this
  }

  set env(env) {
    this.env = env
    this.app.set('env', this.env)
    return this
  }
}

export default Server
