import { applyMiddleware, createStore, compose } from 'redux';

import reduxLoaderReducer from './reducer';
import reduxLoaderMiddleware from './middleware';

const enhancer = compose(applyMiddleware(reduxLoaderMiddleware()));

const store = createStore(reduxLoaderReducer, enhancer);

export default store;
