import { all, takeLatest, call, put } from 'redux-saga/effects';

import { reduxSagaFirebase as rsf } from '../../utils/service';
import { TREE } from '../types';

function* getTreeSaga() {
  try {
    const snapshot = yield call(rsf.firestore.getCollection, 'users');
    let users = [];
    snapshot?.forEach((user) => {
      users = [...users, { ...user.data(), id: user.id }];
    });

    yield put({
      type: TREE.GET_TREE_SUCCESS,
      payload: {
        response: users,
      },
    });
  } catch (err) {
    yield put({
      type: TREE.GET_TREE_FAILURE,
      payload: {
        errors: {
          status: err?.response?.status,
          message: err?.response?.data?.message,
        },
      },
    });
  }
}

export default function* root() {
  yield all([takeLatest(TREE.GET_TREE, getTreeSaga)]);
}
