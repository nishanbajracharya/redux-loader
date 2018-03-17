import * as actions from './actions';

const DEFAULT_REDUCER = 'reduxLoader';

const middleware = (key = DEFAULT_REDUCER) => store => next => action => {
  const state = store.getState()[key];

  if (state) {
    next(action);

    const startActions = state.startActions || {};
    const startActionTypes = Object.keys(startActions);

    const stopActions = state.stopActions || {};
    const stopActionTypes = Object.keys(stopActions);

    if (startActionTypes.includes(action.type)) {
      const ids = startActions[action.type];

      return next({
        type: actions.START_LOADING,
        payload: ids,
      });
    }

    if (stopActionTypes.includes(action.type)) {
      const ids = stopActions[action.type];

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
