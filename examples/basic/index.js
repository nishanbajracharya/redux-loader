import store from './store';
import { reduxLoaderActions } from '../../lib';

const btn = document.querySelector('.button');
const logElem = document.querySelector('.logs');
const loading = document.querySelector('.loading');

const btn2 = document.querySelector('.button2');
const loading2 = document.querySelector('.loading2');

const log = (action, className = '') => {
  logElem.innerHTML += `<li class='${className}'>${action.type}</li>`;
};

store.subscribe(() => {
  if (store.getState().reduxLoader.loaders.myLoader) {
    loading.classList.add('show');
  } else {
    loading.classList.remove('show');
  }

  if (store.getState().reduxLoader.loaders.myLoader2) {
    loading2.classList.add('show');
  } else {
    loading2.classList.remove('show');
  }
});

const registerAction = {
  type: reduxLoaderActions.REGISTER_LOADER,
  payload: {
    id: 'myLoader',
    startActions: ['SOME_ACTION_THAT_TRIGGERS_LOADING', 'ANOTHER_ACTION'],
    stopActions: ['SUCCESS', 'FAILURE'],
  },
};

const successAction = {
  type: 'SUCCESS',
};

const failureAction = {
  type: 'FAILURE',
};

const triggerAction = { type: 'SOME_ACTION_THAT_TRIGGERS_LOADING' };

store.dispatch(registerAction);

store.dispatch({
  type: reduxLoaderActions.REGISTER_LOADER,
  payload: {
    id: 'myLoader2',
    startActions: ['SOME_ACTION_THAT_TRIGGERS_LOADING_2', 'ANOTHER_ACTION_2'],
    stopActions: ['SUCCESS_2', 'FAILURE_2'],
  },
});

const triggerExample = (triggerAction, successAction, failureAction) => {
  store.dispatch(triggerAction);
  log(triggerAction);

  const success = Math.round(Math.random());

  setTimeout(() => {
    if(success) {
      store.dispatch(successAction);
      log(successAction, 'success');
    } else {
      store.dispatch(failureAction);
      log(failureAction, 'failure');
    }
  }, 1500);
};

btn.onclick = () => triggerExample(triggerAction, successAction, failureAction);

btn2.onclick = () => triggerExample({
  type: 'ANOTHER_ACTION_2',
}, {
  type: 'SUCCESS_2',
}, {
  type: 'FAILURE_2',
});
