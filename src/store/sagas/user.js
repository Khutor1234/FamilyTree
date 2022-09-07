import { all, takeLatest, take, call, put } from 'redux-saga/effects';

import {
  authProvider as ap,
  reduxSagaFirebase as rsf,
} from '../../utils/service';
import { USER } from '../types';

function* getUserSaga() {
  try {
    const authChannel = yield call(rsf.auth.channel);

    while (true) {
      const { user } = yield take(authChannel);

      if (user) {
        yield put({
          type: USER.GET_USER_SUCCESS,
          payload: {
            response: user,
          },
        });
      } else {
        yield put({
          type: USER.GET_USER_SUCCESS,
          payload: {
            response: null,
          },
        });
      }
    }
  } catch (err) {
    yield put({
      type: USER.GET_USER_FAILURE,
      payload: {
        errors: {
          status: err?.response?.status,
          message: err?.response?.data?.message,
        },
      },
    });
  }
}

function* logInSaga() {
  try {
    const response = yield call(rsf.auth.signInWithPopup, ap);

    yield put({
      type: USER.LOG_IN_SUCCESS,
      payload: {
        response,
      },
    });
  } catch (err) {
    yield put({
      type: USER.LOG_IN_FAILURE,
      payload: {
        errors: {
          status: err?.response?.status,
          message: err?.response?.data?.message,
        },
      },
    });
  }
}

function* logOutSaga() {
  try {
    yield call(rsf.auth.signOut, ap);

    yield put({
      type: USER.LOG_OUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: USER.LOG_OUT_FAILURE,
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
  yield all([takeLatest(USER.GET_USER, getUserSaga)]);
  yield all([takeLatest(USER.LOG_IN, logInSaga)]);
  yield all([takeLatest(USER.LOG_OUT, logOutSaga)]);
}
