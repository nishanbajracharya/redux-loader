'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduxLoaderMiddleware = exports.reduxLoaderReducer = exports.reduxLoaderActions = undefined;

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _action = require('action');

var reduxLoaderActions = _interopRequireWildcard(_action);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.reduxLoaderActions = reduxLoaderActions;
exports.reduxLoaderReducer = _reducer2.default;
exports.reduxLoaderMiddleware = _middleware2.default;
exports.default = _middleware2.default;