import loader from '../src/middleware';
import * as actions from '../src/actions';

const reducer = 'reduxLoader';
const INITIAL_STATE = {
  [reducer]: {
    history: {
      myLoader: {
        id: 'myLoader',
        startAction: 'DUMMY_START_ACTION',
        successAction: 'DUMMY_SUCCESS_ACTION',
        failureAction: 'DUMMY_FAILURE_ACTION',
      },
    },
    loaders: {
      myLoader: false,
    },
    startActions: {
      DUMMY_START_ACTION: ['myLoader'],
    },
    successActions: {
      DUMMY_SUCCESS_ACTION: ['myLoader'],
    },
    failureActions: {
      DUMMY_FAILURE_ACTION: ['myLoader'],
    },
  },
};

const create = () => {
  const store = {
    getState: jest.fn(() => INITIAL_STATE),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action) => loader(reducer)(store)(next)(action);

  return {store, next, invoke};
};

const startAction = {type: 'DUMMY_START_ACTION'};
const successAction = {type: 'DUMMY_SUCCESS_ACTION'};
const failureAction = {type: 'DUMMY_FAILURE_ACTION'};

it('should pass through non-loader actions', () => {
  const { next, invoke } = create();

  const action = { type: 'TEST' };

  invoke(action);

  expect(next).toHaveBeenCalledWith(action);
});

it('should return start loading action', () => {
  const { next, invoke } = create();

  invoke(startAction);

  const startLoadingAction = {
    type: actions.START_LOADING,
    payload: ['myLoader'],
  };

  expect(next).toHaveBeenCalledWith(startLoadingAction);
});

it('should return stop loading action', () => {
  const { next, invoke } = create();

  invoke(startAction);
  invoke(successAction);

  const stopLoadingAction = {
    type: actions.STOP_LOADING,
    payload: ['myLoader'],
  };

  expect(next).toHaveBeenCalledWith(stopLoadingAction);
});

it('should return stop loading action', () => {
  const { next, invoke } = create();

  invoke(startAction);
  invoke(failureAction);

  const stopLoadingAction = {
    type: actions.STOP_LOADING,
    payload: ['myLoader'],
  };

  expect(next).toHaveBeenCalledWith(stopLoadingAction);
});
