import { createActions } from "redux-actions";

import { TREE } from "../types";

export const { getTree, addUser, editUser } = createActions({
  [TREE.EDIT_USER]: (data, successCallback) => ({ data, successCallback }),
  [TREE.GET_TREE]: () => ({}),
  [TREE.ADD_USER]: (role, userId, user, successCallback) => ({
    role,
    userId,
    user,
    successCallback,
  }),
});
