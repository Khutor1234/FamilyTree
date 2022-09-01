import { all, takeLatest, call, put } from 'redux-saga/effects';
import { USER } from '../types';

export function* getUserSaga() {
  try {
    const response = [
      {
        id: 1,
        name: 'sasha',
      },
    ];

    yield put({
      type: USER.GET_USER_SUCCESS,
      payload: {
        response,
      },
    });
  } catch (err) {
    yield put({
      type: USER.GET_USER_FAILURE,
      payload: err,
    });
  }
}

export default function* root() {
  yield all([takeLatest(USER.GET_USER, getUserSaga)]);
}
