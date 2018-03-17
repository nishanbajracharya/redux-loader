import { applyMiddleware, createStore, compose, combineReducers } from 'redux';

import { reduxLoaderReducer, reduxLoaderMiddleware } from '../../lib';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(reduxLoaderMiddleware()));

const reducer = combineReducers({
  reduxLoader: reduxLoaderReducer,
});

const store = createStore(reducer, enhancer);

export default store;
