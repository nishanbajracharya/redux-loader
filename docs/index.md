# Documentation
The document will walk you through the actions, reducer and middleware that comprises `redux-loader`.

## Actions

Importing into a project.
```js
import { reduxLoaderActions } from 'redux-loader';
```

Redux Loader provides multiple actions as follows:
```js
STOP_LOADING: '@@RL/STOP_LOADING'
START_LOADING: '@@RL/START_LOADING'
REGISTER_LOADER: '@@RL/REGISTER_LOADER'
UNREGISTER_LOADER: '@@RL/UNREGISTER_LOADER'
```

**REGISTER_LOADER**

Used to register a loader into the redux store.
```js
{
  type: '@@RL/REGISTER_LOADER',
  payload: {
    id: 'loaderName',
    startActions: ['START_ACTION'],
    stopActions: ['SUCCESS_ACTION', 'FAILURE_ACTION']
  }
}
```

**UNREGISTER_LOADER**

Used to unregister loader from redux store.

```js
{
  type: '@@RL/UNREGISTER_LOADER',
  payload: 'loaderName'
}
```

**START_LOADING**

Used to enable loading state.

```js
{
  type: '@@RL/START_LOADING',
  payload: 'loaderName'
}
```

**STOP_LOADING**

Used to disable loading state.

```js
{
  type: '@@RL/STOP_LOADING',
  payload: 'loaderName'
}
```

## Action Creators

**registerLoader**

```js
registerLoader({
  id: String,
  startActions: Array,
  stopActions: Array
})
```

Returns `@@RL/REGISTER_LOADER`.

Example
```js
reduxLoaderActions.registerLoader({
  id: 'loaderName',
  startActions: ['START_ACTION'],
  stopActions: ['SUCCESS_ACTION', 'FAILURE_ACTION']
});
```

**unregisterLoader**

```js
unregisterLoader(id: String)
```

Returns `@@RL/UNREGISTER_LOADER`.

Example
```js
reduxLoaderActions.unregisterLoader('loaderName');
```

**startLoading**

```js
startLoading(id: String)
```

Returns `@@RL/START_LOADING`.

Example
```js
reduxLoaderActions.startLoading('loaderName');
```

**stopLoading**

```js
stopLoading(id: String)
```

Returns `@@RL/STOP_LOADING`.

Example
```js
reduxLoaderActions.stopLoading('loaderName');
```

## Reducer

Importing the reducer
```js
import { reduxLoaderReducer } from 'redux-loader';
```

Using the reducer
```js
const reducer = combineReducers({
  reduxLoader: reduxLoaderReducer,
  // other reducers
});

const store = createStore(reducer, ...);
```

This section describes the redux state registered by `redux-loader`.
![Redux Loader State](reducer.png "Redux Loader State")

**history**

Stores the dispatched `@REGISTER_LOADER` action payload as is, with the id as the key.

**loaders**

Stores the loader ids as key and `bool` as values. This is the main state used to enable or disable loading values. `@@RL/START_LOADING`, `@@RL/STOP_LOADING`, and `@@RL/UNREGISTER_LOADER` actions reference ids from this section.

**startActions**

Stores all the registered start action types. Each key represents the start action and value represents the loader that registered it. Values are replaced if a new loader registers the same start action.

**stopActions**

Stores all the registered stop action types. Each key represents the stop action and value represents the loader that registered it. Values are replaced if a new loader registers the same stop action.

## Middleware

Importing the middleware

```js
import { reduxLoaderMiddleware } from 'redux-loader';
```

Using the middleware

```js
//store.js

import { reduxLoaderReducer, reduxLoaderMiddleware } from 'redux-loader';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';

const loaderMiddleware = reduxLoaderMiddleware();
const middlewares = [
  loaderMiddleware,
  // other middlewares
]
const enhancer = compose(applyMiddleware(...middlewares));

const reducer = combineReducers({
  reduxLoader: reduxLoaderReducer,
  // other reducers
});

const store = createStore(reducer, enhancer);
```

The `reduxLoaderMiddleware` function accepts a key that should be the same as the key used to add `reduxLoaderReducer` into `combineReducers`.

```js
const loaderMiddleware = reduxLoaderMiddleware('myCustomLoader');
// Uses 'reduxLoader' by default

const reducer = combineReducers({
  myCustomLoader: reduxLoaderReducer,
  // other reducers
});
```
