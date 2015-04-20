'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireWildcard(_debug);

function bootstrap(customPkg) {
  var pkg = customPkg || require('../package.json');
  var modules = {};

  Object.keys(pkg.devDependencies).forEach(function (moduleName) {
    var m = loadModule(moduleName);

    if (typeof m === 'string') return _debug2['default']('bootstrap')(m);

    modules[camelize(moduleName)] = m;
  });

  return modules;
}

function loadModule(moduleName) {
  try {
    return require(moduleName);;
  } catch (err) {
    _debug2['default']('utils')(err);
    return 'No ' + moduleName + ' module found, aborted.';
  }
}

function camelize(str) {
  if (str.indexOf('-') === 0) {
    return str;
  }var token = str.split('-');
  if (!token.length) {
    return str;
  }for (var i = token.length - 1; i >= 0; i--) {
    (function (index) {
      if (index === 0) return;
      token[index] = token[index].charAt(0).toUpperCase() + token[index].substr(1);
    })(i);
  };

  return token.join('');
}

exports.bootstrap = bootstrap;