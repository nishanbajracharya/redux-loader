import reduxLoaderReducer from './reducer';
import * as reduxLoaderActions from './actions';
import reduxLoaderMiddleware from './middleware';

export { reduxLoaderActions, reduxLoaderReducer, reduxLoaderMiddleware };

export default reduxLoaderMiddleware;

export { reduxLoaderActions as actions };
export { default as reducer } from './reducer';
export { default as middleware } from './middleware';
