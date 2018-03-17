import reducer from '../src/reducer';
import * as actions from '../src/actions';

const initialState = {
  history: {},
  loaders: {},
  startActions: {},
  successActions: {},
  failureActions: {},
}

const registerAction = actions.registerLoader({
  id: 'myLoader',
  startAction: 'DUMMY_START_ACTION',
  successAction: 'DUMMY_SUCCESS_ACTION',
  failureAction: 'DUMMY_FAILURE_ACTION'
});

const stopLoadingAction = actions.stopLoading({myLoader: false});
const startLoadingAction = actions.startLoading({myLoader: true});
const unregisterAction = actions.unregisterLoader('myLoader');

it('should return new state with registered loader', () => {
  const newState = reducer(initialState, registerAction);

  const expectedState = {
    history: {
      myLoader: {
        id: 'myLoader',
        startAction: 'DUMMY_START_ACTION',
        successAction: 'DUMMY_SUCCESS_ACTION',
        failureAction: 'DUMMY_FAILURE_ACTION'
      }
    },
    loaders: {
      myLoader: false
    },
    startActions: {
      DUMMY_START_ACTION: ['myLoader']
    },
    successActions: {
      DUMMY_SUCCESS_ACTION: ['myLoader']
    },
    failureActions: {
      DUMMY_FAILURE_ACTION: ['myLoader']
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
        startAction: 'DUMMY_START_ACTION',
        successAction: 'DUMMY_SUCCESS_ACTION',
        failureAction: 'DUMMY_FAILURE_ACTION'
      }
    },
    loaders: {
      myLoader: true
    },
    startActions: {
      DUMMY_START_ACTION: ['myLoader']
    },
    successActions: {
      DUMMY_SUCCESS_ACTION: ['myLoader']
    },
    failureActions: {
      DUMMY_FAILURE_ACTION: ['myLoader']
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
        startAction: 'DUMMY_START_ACTION',
        successAction: 'DUMMY_SUCCESS_ACTION',
        failureAction: 'DUMMY_FAILURE_ACTION'
      }
    },
    loaders: {
      myLoader: false
    },
    startActions: {
      DUMMY_START_ACTION: ['myLoader']
    },
    successActions: {
      DUMMY_SUCCESS_ACTION: ['myLoader']
    },
    failureActions: {
      DUMMY_FAILURE_ACTION: ['myLoader']
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
