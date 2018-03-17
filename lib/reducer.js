'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var omit = function omit() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var blacklist = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  return Object.keys(obj).filter(function (key) {
    return blacklist !== key;
  }).reduce(function (newObj, key) {
    return _extends({}, newObj, _defineProperty({}, key, obj[key]));
  }, {});
};

var setLoaderIdStatus = function setLoaderIdStatus() {
  var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return ids.reduce(function (acc, id) {
    return _extends({}, acc, _defineProperty({}, id, status));
  }, {});
};

var INITIAL_STATE = {
  history: {},
  loaders: {},
  startActions: {},
  successActions: {},
  failureActions: {}
};

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;
  var action = arguments[1];

  switch (action.type) {
    case actions.REGISTER_LOADER:
      return _extends({}, state, {
        loaders: _extends({}, state.loaders, _defineProperty({}, action.payload.id, false)),
        startActions: _extends({}, state.startAction, _defineProperty({}, action.payload.startAction, [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(state[action.payload.startAction] || []), [action.payload.id])))))),
        successActions: _extends({}, state.successActions, _defineProperty({}, action.payload.successAction, [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(state[action.payload.successAction] || []), [action.payload.id])))))),
        failureActions: _extends({}, state.failureActions, _defineProperty({}, action.payload.failureAction, [].concat(_toConsumableArray(new Set([].concat(_toConsumableArray(state[action.payload.failureAction] || []), [action.payload.id])))))),
        history: _extends({}, state.history, _defineProperty({}, action.payload.id, action.payload))
      });
    case actions.UNREGISTER_LOADER:
      return _extends({}, state, {
        history: omit(state.history, action.payload),
        loaders: omit(state.loaders, action.payload),
        startActions: omit(state.startActions, state.history[action.payload].startAction),
        successActions: omit(state.successActions, state.history[action.payload].successAction),
        failureActions: omit(state.failureActions, state.history[action.payload].failureAction)
      });
    case actions.START_LOADING:
      return _extends({}, state, {
        loaders: _extends({}, state.loaders, setLoaderIdStatus(action.payload, true))
      });
    case actions.STOP_LOADING:
      return _extends({}, state, {
        loaders: _extends({}, state.loaders, setLoaderIdStatus(action.payload, false))
      });
    default:
      return state;
  }
};

exports.default = reducer;