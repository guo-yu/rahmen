'use strict';

var _arguments = arguments;

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireWildcard(_debug);

exports['default'] = function (globalName) {
  return function () {
    var args = Array.prototype.slice.call(_arguments, 0);

    return _debug2['default'](args.length > 0 ? [globalName, args.join(':')].join(':') : globalName);
  };
};

module.exports = exports['default'];