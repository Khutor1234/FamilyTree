import initialState from '../initialStates';
import injectReducer from '../injectReducer';

import { USER } from '../types';

export default injectReducer(initialState.userReducer, {
  [USER.GET_USER]: (state) => {
    return {
      ...state,
      isRequest: true,
      errors: null,
    };
  },
  [USER.GET_USER_SUCCESS]: (state, { payload: { response } }) => ({
    ...state,
    isRequest: false,
    user: response,
    errors: null,
  }),
  [USER.GET_USER_FAILURE]: (state, { payload: { errors } }) => ({
    ...state,
    isRequest: false,
    user: null,
    errors: errors,
  }),

  [USER.LOG_IN]: (state) => ({
    ...state,
    isRequest: true,
    errors: null,
  }),
  [USER.LOG_IN_SUCCESS]: (state) => ({
    ...state,
    isRequest: false,
    errors: null,
  }),
  [USER.LOG_IN_FAILURE]: (state, { payload: { errors } }) => ({
    ...state,
    isRequest: false,
    user: null,
    errors: errors,
  }),

  [USER.LOG_OUT]: (state) => ({
    ...state,
    isRequest: true,
    errors: null,
  }),
  [USER.LOG_OUT_SUCCESS]: (state) => ({
    ...state,
    isRequest: false,
    user: null,
    errors: null,
  }),
  [USER.LOG_OUT_FAILURE]: (state, { payload: { errors } }) => ({
    ...state,
    isRequest: false,
    user: null,
    errors: errors,
  }),
});
