import * as actions from './actions';

const omit = (obj = {}, blacklist = '') =>
  Object.keys(obj)
    .filter(key => blacklist !== key)
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {});

const INITIAL_STATE = {
  history: {},
  loaders: {},
  startActions: {},
  successActions: {},
  failureActions: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case actions.REGISTER_LOADER:
      return {
        ...state,
        loaders: { ...state.loaders, [action.payload.id]: false },
        startActions: {
          ...state.startAction,
          [action.payload.startAction]: [
            ...new Set([
              ...(state[action.payload.startAction] || []),
              action.payload.id
            ])
          ],
        },
        successActions: {
          ...state.successActions,
          [action.payload.successAction]: [
            ...new Set([
              ...(state[action.payload.successAction] || []),
              action.payload.id
            ])
          ],
        },
        failureActions: {
          ...state.failureActions,
          [action.payload.failureAction]: [
            ...new Set([
              ...(state[action.payload.failureAction] || []),
              action.payload.id
            ])
          ],
        },
        history: {
          ...state.history,
          [action.payload.id]: action.payload,
        },
      };
    case actions.UNREGISTER_LOADER:
      return {
        ...state,
        history: omit(state.history, action.payload),
        loaders: omit(state.loaders, action.payload),
        startActions: omit(
          state.startActions,
          state.history[action.payload].startAction
        ),
        successActions: omit(
          state.successActions,
          state.history[action.payload].successAction
        ),
        failureActions: omit(
          state.failureActions,
          state.history[action.payload].failureAction
        ),
      };
    case actions.START_LOADING:
    case actions.STOP_LOADING:
      return {
        ...state,
        loaders: { ...state.loaders, ...action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
