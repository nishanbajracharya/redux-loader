'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhancer = (0, _redux.compose)((0, _redux.applyMiddleware)((0, _middleware2.default)()));

var store = (0, _redux.createStore)(_reducer2.default, enhancer);

exports.default = store;