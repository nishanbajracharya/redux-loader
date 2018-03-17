import { applyMiddleware, createStore, compose } from 'redux';

import { reduxLoaderReducer, reduxLoaderMiddleware } from '../lib';

const enhancer = compose(applyMiddleware(reduxLoaderMiddleware()));

const store = createStore(reduxLoaderReducer, enhancer);

export default store;
