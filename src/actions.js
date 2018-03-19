export const STOP_LOADING = '@@STOP_LOADING';
export const START_LOADING = '@@START_LOADING';
export const REGISTER_LOADER = '@@REGISTER_LOADER';
export const UNREGISTER_LOADER = '@@UNREGISTER_LOADER';

export const stopLoading = id => ({
  type: STOP_LOADING,
  payload: id,
});

export const startLoading = id => ({
  type: START_LOADING,
  payload: id,
});

export const registerLoader = ({
  id,
  stopActions,
  startActions,
}) => ({
  type: REGISTER_LOADER,
  payload: {
    id,
    stopActions,
    startActions,
  },
});

export const unregisterLoader = id => ({
  type: UNREGISTER_LOADER,
  payload: id,
});

export default {
  // Actions
  STOP_LOADING,
  START_LOADING,
  REGISTER_LOADER,
  UNREGISTER_LOADER,

  // Action creators
  stopLoading,
  startLoading,
  registerLoader,
  unregisterLoader,
};
