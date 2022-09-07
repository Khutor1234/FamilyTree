import initialState from '../initialStates';
import injectReducer from '../injectReducer';

import { TREE } from '../types';

export default injectReducer(initialState.treeReducer, {
  [TREE.GET_TREE]: (state) => ({
    ...state,
    isRequest: true,
    errors: null,
    tree: [],
  }),
  [TREE.GET_TREE_SUCCESS]: (state, { payload: { response } }) => ({
    ...state,
    isRequest: false,
    errors: null,
    tree: response,
  }),
  [TREE.GET_TREE_FAILURE]: (state, { payload: { errors } }) => ({
    ...state,
    isRequest: false,
    errors: errors,
    tree: null,
  }),
});
