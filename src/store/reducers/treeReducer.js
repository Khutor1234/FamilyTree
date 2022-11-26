import initialState from "../initialStates";
import injectReducer from "../injectReducer";

import { TREE } from "../types";

export default injectReducer(initialState.treeReducer, {
  [TREE.EDIT_USER]: (state) => {
    return {
      ...state,
      isRequest: true,
      errors: null,
    };
  },
  [TREE.EDIT_USER_SUCCESS]: (state) => ({
    ...state,
    isRequest: false,
    errors: null,
  }),
  [TREE.EDIT_USER_FAILURE]: (state, { payload: { errors } }) => ({
    ...state,
    isRequest: false,
    user: null,
    errors: errors,
  }),

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
    tree: [],
  }),

  [TREE.ADD_USER]: (state) => ({
    ...state,
    isRequest: true,
    errors: null,
  }),
  [TREE.ADD_USER_SUCCESS]: (state, { payload: { response } }) => {
    return {
      ...state,
      isRequest: false,
      errors: null,
    };
  },
  [TREE.ADD_USER_FAILURE]: (state, { payload: { errors } }) => ({
    ...state,
    isRequest: false,
    errors: errors,
  }),
});
