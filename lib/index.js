'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduxLoaderMiddleware = exports.reduxLoaderReducer = exports.reduxLoaderActions = undefined;

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.reduxLoaderActions = _actions2.default;
exports.reduxLoaderReducer = _reducer2.default;
exports.reduxLoaderMiddleware = _middleware2.default;
exports.default = { actions: _actions2.default, reducer: _reducer2.default, middleware: _middleware2.default };