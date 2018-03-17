export const STOP_LOADING = '@@STOP_LOADING';
export const START_LOADING = '@@START_LOADING';
export const REGISTER_LOADER = '@@REGISTER_LOADER';
export const UNREGISTER_LOADER = '@@UNREGISTER_LOADER';

export const stopLoading = ids => ({
  type: STOP_LOADING,
  payload: ids
});

export const startLoading = ids => ({
  type: START_LOADING,
  payload: ids
});

export const registerLoader = ({
  id,
  startAction,
  successAction,
  failureAction
}) => ({
  type: REGISTER_LOADER,
  payload: {
    id,
    startAction,
    successAction,
    failureAction
  }
});

export const unregisterLoader = id => ({
  type: UNREGISTER_LOADER,
  payload: id
});
