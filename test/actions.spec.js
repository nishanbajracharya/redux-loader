import * as actions from '../src/actions';

it('should return register action', () => {
  const expectedAction = {
    type: actions.REGISTER_LOADER,
    payload: {
      id: 'myLoader',
      startAction: 'DUMMY_START_ACTION',
      successAction: 'DUMMY_SUCCESS_ACTION',
      failureAction: 'DUMMY_FAILURE_ACTION',
    },
  };

  const action = actions.registerLoader({
    id: 'myLoader',
    startAction: 'DUMMY_START_ACTION',
    successAction: 'DUMMY_SUCCESS_ACTION',
    failureAction: 'DUMMY_FAILURE_ACTION',
  });

  expect(action).toEqual(expectedAction);
});

it('should return unregister action', () => {
  const expectedAction = {
    type: actions.UNREGISTER_LOADER,
    payload: 'myLoader',
  };

  const action = actions.unregisterLoader('myLoader');

  expect(action).toEqual(expectedAction);
});

it('should return start loading action', () => {
  const expectedAction = {
    type: actions.START_LOADING,
    payload: ['myLoader'],
  };

  const action = actions.startLoading(['myLoader']);

  expect(action).toEqual(expectedAction);
});

it('should return stop loading action', () => {
  const expectedAction = {
    type: actions.STOP_LOADING,
    payload: ['myLoader'],
  };

  const action = actions.stopLoading(['myLoader']);

  expect(action).toEqual(expectedAction);
});
