# Documentation
The document will walk you through the actions, reducer and middleware that comprises `redux-loader`.

## Actions
Redux Loader provides multiple actions as follows:

```js
STOP_LOADING: '@@STOP_LOADING'
START_LOADING: '@@START_LOADING'
REGISTER_LOADER: '@@REGISTER_LOADER'
UNREGISTER_LOADER: '@@UNREGISTER_LOADER'
```

**REGISTER_LOADER**

Used to register a loader into the redux store.

```js
{
  type: '@@REGISTER_LOADER',
  payload: {
    id: 'loaderName',
    startActions: ['START_ACTION'],
    stopActions: ['SUCCESS_ACTION', 'FAILUER_ACTION']
  }
}
```

**UNREGISTER_LOADER**

Used to unregister loader from redux store.

```js
{
  type: '@@UNREGISTER_LOADER',
  payload: 'loaderName'
}
```

**START_LOADING**

Used to enable loading state.

```js
{
  type: '@@START_LOADING',
  payload: 'loaderName'
}
```

**STOP_LOADING**

Used to disable loading state.

```js
{
  type: '@@STOP_LOADING',
  payload: 'loaderName'
}
```
