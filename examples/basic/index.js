import store from '../store';
import { reduxLoaderActions } from '../../lib';

const btn = document.querySelector('.button');
const logElem = document.querySelector('.logs');
const loading = document.querySelector('.loading');

const log = (action, className = '') => {
  logElem.innerHTML += `<li class='${className}'>${action.type}</li>`;
};

store.subscribe(() => {
  if (store.getState().reduxLoader.loaders.myLoader) {
    loading.classList.add('show');
  } else {
    loading.classList.remove('show');
  }
});

const registerAction = {
  type: reduxLoaderActions.REGISTER_LOADER,
  payload: {
    id: 'myLoader',
    startAction: 'SOME_ACTION_THAT_TRIGGERS_LOADING',
    successAction: 'SUCCESS',
    failureAction: 'FAILURE',
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

const triggerExample = () => {
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

btn.onclick = () => triggerExample();
