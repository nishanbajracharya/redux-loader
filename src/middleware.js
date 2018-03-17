const DEFAULT_REDUCER = 'reduxLoader';

const middleware = (key = DEFAULT_REDUCER) => store => next => action => {

  return next(action);
};

export default middleware;
