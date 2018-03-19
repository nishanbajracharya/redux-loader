'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var omit = function omit() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var blacklist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return Object.keys(obj).filter(function (key) {
    return !blacklist.includes(key);
  }).reduce(function (newObj, key) {
    return _extends({}, newObj, _defineProperty({}, key, obj[key]));
  }, {});
};

var reduceArrayToObjectValue = function reduceArrayToObjectValue() {
  var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return ids.reduce(function (acc, id) {
    return _extends({}, acc, _defineProperty({}, id, status));
  }, {});
};

var INITIAL_STATE = {
  history: {},
  loaders: {},
  startActions: {},
  stopActions: {}
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case _actions2.default.REGISTER_LOADER:
      return _extends({}, state, {
        loaders: _extends({}, state.loaders, _defineProperty({}, action.payload.id, false)),
        startActions: _extends({}, state.startActions, reduceArrayToObjectValue(action.payload.startActions, action.payload.id)),
        stopActions: _extends({}, state.stopActions, reduceArrayToObjectValue(action.payload.stopActions, action.payload.id)),
        history: _extends({}, state.history, _defineProperty({}, action.payload.id, action.payload))
      });
    case _actions2.default.UNREGISTER_LOADER:
      return _extends({}, state, {
        history: omit(state.history, action.payload),
        loaders: omit(state.loaders, action.payload),
        startActions: omit(state.startActions, state.history[action.payload].startActions),
        stopActions: omit(state.stopActions, state.history[action.payload].stopActions)
      });
    case _actions2.default.START_LOADING:
      return _extends({}, state, {
        loaders: _extends({}, state.loaders, _defineProperty({}, action.payload, true))
      });
    case _actions2.default.STOP_LOADING:
      return _extends({}, state, {
        loaders: _extends({}, state.loaders, _defineProperty({}, action.payload, false))
      });
    default:
      return state;
  }
};

exports.default = reducer;