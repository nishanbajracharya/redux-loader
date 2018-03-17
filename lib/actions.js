'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var STOP_LOADING = exports.STOP_LOADING = '@@STOP_LOADING';
var START_LOADING = exports.START_LOADING = '@@START_LOADING';
var REGISTER_LOADER = exports.REGISTER_LOADER = '@@REGISTER_LOADER';
var UNREGISTER_LOADER = exports.UNREGISTER_LOADER = '@@UNREGISTER_LOADER';

var stopLoading = exports.stopLoading = function stopLoading(ids) {
  return {
    type: STOP_LOADING,
    payload: ids
  };
};

var startLoading = exports.startLoading = function startLoading(ids) {
  return {
    type: START_LOADING,
    payload: ids
  };
};

var registerLoader = exports.registerLoader = function registerLoader(_ref) {
  var id = _ref.id,
      startActions = _ref.startActions,
      stopActions = _ref.stopActions;
  return {
    type: REGISTER_LOADER,
    payload: {
      id: id,
      startActions: startActions,
      stopActions: stopActions
    }
  };
};

var unregisterLoader = exports.unregisterLoader = function unregisterLoader(id) {
  return {
    type: UNREGISTER_LOADER,
    payload: id
  };
};