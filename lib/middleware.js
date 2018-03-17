'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var DEFAULT_REDUCER = 'reduxLoader';

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

          var stopActions = state.stopActions || {};
          var stopActionTypes = Object.keys(stopActions);

          if (startActionTypes.includes(action.type)) {
            var ids = startActions[action.type];

            return next({
              type: actions.START_LOADING,
              payload: ids
            });
          }

          if (stopActionTypes.includes(action.type)) {
            var _ids = stopActions[action.type];

            return next({
              type: actions.STOP_LOADING,
              payload: _ids
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