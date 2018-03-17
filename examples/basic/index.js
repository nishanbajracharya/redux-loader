import store from '../store';
import { reduxLoaderActions } from '../../lib';

const btn = document.querySelector('.button');
const logElem = document.querySelector('.logs');
const loading = document.querySelector('.loading');

const log = action => {
  logElem.innerHTML += `<li>${action.type}</li>`;
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

const triggerAction = { type: 'SOME_ACTION_THAT_TRIGGERS_LOADING' };

store.dispatch(registerAction);

const triggerExample = () => {
  store.dispatch(triggerAction);
  log(triggerAction);

  setTimeout(() => {
    store.dispatch(successAction);
    log(successAction);
  }, 1500);
};

btn.onclick = () => triggerExample();
