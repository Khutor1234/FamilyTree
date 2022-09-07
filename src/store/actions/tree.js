import { createActions } from 'redux-actions';

import { TREE } from '../types';

export const { getTree } = createActions({
  [TREE.GET_TREE]: () => ({}),
});
