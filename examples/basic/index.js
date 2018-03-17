import store from '../store';
import { reduxLoaderActions } from '../../lib';

const btn = document.querySelector('.button');
const loading = document.querySelector('.loading');

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

store.dispatch(registerAction);

const triggerExample = () => {

  store.dispatch({ type: 'SOME_ACTION_THAT_TRIGGERS_LOADING', payload: 'Mike' });

  setTimeout(() => {
    store.dispatch(successAction);
  }, 1500);
};

btn.onclick = () => triggerExample();
