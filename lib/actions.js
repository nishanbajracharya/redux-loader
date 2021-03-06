'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var STOP_LOADING = exports.STOP_LOADING = '@@RL/STOP_LOADING';
var START_LOADING = exports.START_LOADING = '@@RL/START_LOADING';
var REGISTER_LOADER = exports.REGISTER_LOADER = '@@RL/REGISTER_LOADER';
var UNREGISTER_LOADER = exports.UNREGISTER_LOADER = '@@RL/UNREGISTER_LOADER';

var stopLoading = exports.stopLoading = function stopLoading(id) {
  return {
    type: STOP_LOADING,
    payload: id
  };
};

var startLoading = exports.startLoading = function startLoading(id) {
  return {
    type: START_LOADING,
    payload: id
  };
};

var registerLoader = exports.registerLoader = function registerLoader(_ref) {
  var id = _ref.id,
      stopActions = _ref.stopActions,
      startActions = _ref.startActions;
  return {
    type: REGISTER_LOADER,
    payload: {
      id: id,
      stopActions: stopActions,
      startActions: startActions
    }
  };
};

var unregisterLoader = exports.unregisterLoader = function unregisterLoader(id) {
  return {
    type: UNREGISTER_LOADER,
    payload: id
  };
};

exports.default = {
  // Actions
  STOP_LOADING: STOP_LOADING,
  START_LOADING: START_LOADING,
  REGISTER_LOADER: REGISTER_LOADER,
  UNREGISTER_LOADER: UNREGISTER_LOADER,

  // Action creators
  stopLoading: stopLoading,
  startLoading: startLoading,
  registerLoader: registerLoader,
  unregisterLoader: unregisterLoader
};