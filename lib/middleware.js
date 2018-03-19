'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            var id = startActions[action.type];

            return next({
              type: _actions2.default.START_LOADING,
              payload: id
            });
          }

          if (stopActionTypes.includes(action.type)) {
            var _id = stopActions[action.type];

            return next({
              type: _actions2.default.STOP_LOADING,
              payload: _id
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