import { createActions } from 'redux-actions';

import { TREE } from '../types';

export const { getTree, addUser } = createActions({
  [TREE.GET_TREE]: () => ({}),
  [TREE.ADD_USER]: (role, userId, user) => ({ role, userId, user }),
});
