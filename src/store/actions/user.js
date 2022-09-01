import { createActions } from 'redux-actions';

import { USER } from '../types';

export const { getUser } = createActions({
  [USER.GET_USER]: () => ({}),
});
