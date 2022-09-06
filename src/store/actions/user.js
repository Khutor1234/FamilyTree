import { createActions } from 'redux-actions';

import { USER } from '../types';

export const { getUser, logIn, logOut } = createActions({
  [USER.GET_USER]: () => ({}),
  [USER.LOG_IN]: () => ({}),
  [USER.LOG_OUT]: () => ({}),
});
