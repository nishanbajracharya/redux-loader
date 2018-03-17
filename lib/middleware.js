'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_REDUCER = 'reduxLoader';

var setLoaderIdStatus = function setLoaderIdStatus() {
  var ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return ids.reduce(function (acc, id) {
    return _extends({}, acc, _defineProperty({}, id, status));
  }, {});
};

var middleware = function middleware() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_REDUCER;
  return function (store) {
    return function (next) {
      return function (action) {
        var state = store.getState()[key];

        if (state) {
          next(action);

          var startActions = state.startActions || {};
          var startActionTypes = Object.keys(startActions);

          var successActions = state.successActions || {};
          var successActionTypes = Object.keys(successActions);

          var failureActions = state.failureActions || {};
          var failureActionTypes = Object.keys(failureActions);

          if (startActionTypes.includes(action.type)) {
            var ids = startActions[action.type];

            return next({
              type: actions.START_LOADING,
              payload: setLoaderIdStatus(ids, true)
            });
          }

          if (successActionTypes.includes(action.type)) {
            var _ids = successActions[action.type];

            return next({
              type: actions.STOP_LOADING,
              payload: setLoaderIdStatus(_ids, false)
            });
          }

          if (failureActionTypes.includes(action.type)) {
            var _ids2 = failureActions[action.type];

            return next({
              type: actions.STOP_LOADING,
              payload: setLoaderIdStatus(_ids2, false)
            });
          }

          return;
        }

        return next(action);
      };
    };
  };
};

exports.default = middleware;