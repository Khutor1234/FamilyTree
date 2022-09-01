import initialState from '../initialStates';
import injectReducer from '../injectReducer';

import { USER } from '../types';

export default injectReducer(initialState.userReducer, {
  [USER.GET_USER]: (state) => ({
    ...state,
    isRequest: true,
    user: null,
    errors: null,
  }),
  [USER.GET_USER_SUCCESS]: (state, { payload: { response } }) => ({
    ...state,
    isRequest: false,
    user: response,
    errors: null,
  }),
  [USER.GET_USER_FAILURE]: (state, { payload }) => ({
    ...state,
    isRequest: false,
    user: null,
    errors: payload,
  }),
});
