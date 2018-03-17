import * as actions from './actions';

const DEFAULT_REDUCER = 'reduxLoader';

const middleware = (key = DEFAULT_REDUCER) => store => next => action => {
  const state = store.getState()[key];

  if (state) {
    next(action);

    const startActions = state.startActions || {};
    const startActionTypes = Object.keys(startActions);

    const successActions = state.successActions || {};
    const successActionTypes = Object.keys(successActions);

    const failureActions = state.failureActions || {};
    const failureActionTypes = Object.keys(failureActions);

    if (startActionTypes.includes(action.type)) {
      const ids = startActions[action.type];

      return next({
        type: actions.START_LOADING,
        payload: ids,
      });
    }

    if (successActionTypes.includes(action.type)) {
      const ids = successActions[action.type];

      return next({
        type: actions.STOP_LOADING,
        payload: ids,
      });
    }

    if (failureActionTypes.includes(action.type)) {
      const ids = failureActions[action.type];

      return next({
        type: actions.STOP_LOADING,
        payload: ids,
      });
    }

    return;
  }

  return next(action);
};

export default middleware;