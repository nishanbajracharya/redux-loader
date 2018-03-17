import * as actions from './actions';

const omit = (obj = {}, blacklist = []) =>
  Object.keys(obj)
    .filter(key => !blacklist.includes(key))
    .reduce((newObj, key) => ({ ...newObj, [key]: obj[key] }), {});


const setLoaderIdStatus = (ids = [], status = false) =>
  ids.reduce(
    (acc, id) => ({
      ...acc,
      [id]: status,
    }),
    {}
  );

const spreadArrayToObject = (array, value, state) => ({
  ...state,
  ...setLoaderIdStatus(array, value),
});


const INITIAL_STATE = {
  history: {},
  loaders: {},
  startActions: {},
  stopActions: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actions.REGISTER_LOADER:
      return {
        ...state,
        loaders: { ...state.loaders, [action.payload.id]: false },
        startActions: spreadArrayToObject(action.payload.startActions, action.payload.id, state.startActions),
        stopActions: spreadArrayToObject(action.payload.stopActions, action.payload.id, state.stopActions),
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
          state.history[action.payload].startActions
        ),
        stopActions: omit(
          state.stopActions,
          state.history[action.payload].stopActions
        ),
      };
    case actions.START_LOADING:
      return {
        ...state,
        loaders: { ...state.loaders, [action.payload]: true },
      };
    case actions.STOP_LOADING:
      return {
        ...state,
        loaders: { ...state.loaders, [action.payload]: false },
      };
    default:
      return state;
  }
};

export default reducer;
