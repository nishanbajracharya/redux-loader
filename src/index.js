import reduxLoaderReducer from './reducer';
import reduxLoaderActions from './actions';
import reduxLoaderMiddleware from './middleware';

export { reduxLoaderActions, reduxLoaderReducer, reduxLoaderMiddleware };

export default { actions: reduxLoaderActions, reducer: reduxLoaderReducer, middleware: reduxLoaderMiddleware };
