import reducer from '../src/reducer';
import * as actions from '../src/actions';

const initialState = {
  history: {},
  loaders: {},
  stopActions: {},
  startActions: {},
};

const registerAction = actions.registerLoader({
  id: 'myLoader',
  startActions: ['DUMMY_START_ACTION'],
  stopActions: ['DUMMY_SUCCESS_ACTION', 'DUMMY_FAILURE_ACTION'],
});

const stopLoadingAction = actions.stopLoading('myLoader');
const startLoadingAction = actions.startLoading('myLoader');
const unregisterAction = actions.unregisterLoader('myLoader');

it('should return new state with registered loader', () => {
  const newState = reducer(initialState, registerAction);

  const expectedState = {
    history: {
      myLoader: {
        id: 'myLoader',
        startActions: ['DUMMY_START_ACTION'],
        stopActions: ['DUMMY_SUCCESS_ACTION', 'DUMMY_FAILURE_ACTION'],
      },
    },
    loaders: {
      myLoader: false,
    },
    startActions: {
      DUMMY_START_ACTION: 'myLoader',
    },
    stopActions: {
      DUMMY_SUCCESS_ACTION: 'myLoader',
      DUMMY_FAILURE_ACTION: 'myLoader',
    },
  };

  expect(newState).toEqual(expectedState);
});

it('should return new state with loading started', () => {
  const registeredState = reducer(initialState, registerAction);
  const newState = reducer(registeredState, startLoadingAction);

  const expectedState = {
    history: {
      myLoader: {
        id: 'myLoader',
        startActions: ['DUMMY_START_ACTION'],
        stopActions: ['DUMMY_SUCCESS_ACTION', 'DUMMY_FAILURE_ACTION'],
      },
    },
    loaders: {
      myLoader: true,
    },
    startActions: {
      DUMMY_START_ACTION: 'myLoader',
    },
    stopActions: {
      DUMMY_SUCCESS_ACTION: 'myLoader',
      DUMMY_FAILURE_ACTION: 'myLoader',
    },
  };

  expect(newState).toEqual(expectedState);
});

it('should return new state with loading stopped', () => {
  const registeredState = reducer(initialState, registerAction);
  const loadingState = reducer(registeredState, startLoadingAction);
  const newState = reducer(loadingState, stopLoadingAction);

  const expectedState = {
    history: {
      myLoader: {
        id: 'myLoader',
        startActions: ['DUMMY_START_ACTION'],
        stopActions: ['DUMMY_SUCCESS_ACTION', 'DUMMY_FAILURE_ACTION'],
      },
    },
    loaders: {
      myLoader: false,
    },
    startActions: {
      DUMMY_START_ACTION: 'myLoader',
    },
    stopActions: {
      DUMMY_SUCCESS_ACTION: 'myLoader',
      DUMMY_FAILURE_ACTION: 'myLoader',
    },
  };

  expect(newState).toEqual(expectedState);
});

it('should return new state with unregistered loader', () => {
  const registeredState = reducer(initialState, registerAction);
  const loadingState = reducer(registeredState, startLoadingAction);
  const stoppedState = reducer(loadingState, stopLoadingAction);
  const newState = reducer(stoppedState, unregisterAction);

  expect(newState).toEqual(initialState);
});
