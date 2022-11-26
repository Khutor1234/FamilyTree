import { all, takeLatest, take, call, put } from "redux-saga/effects";

import {
  authProvider as ap,
  reduxSagaFirebase as rsf,
  db,
} from "../../utils/service";
import { USER } from "../types";

function* getUserSaga() {
  try {
    const authChannel = yield call(rsf.auth.channel);
    const getTime = (time) => {
      if (time) {
        return new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
      }
      return "";
    };

    while (true) {
      const { user } = yield take(authChannel);

      if (user) {
        let usersRef = db.collection("users");

        const snapshot = yield call([
          usersRef.where("email", "==", user.email),
          usersRef.get,
        ]);

        let userData = {};
        snapshot.forEach((user) => {
          userData = {
            ...user.data(),
            id: user.id,
            born: {
              ...user.data().born,
              date: getTime(user.data().born.date),
            },
          };
        });

        yield put({
          type: USER.GET_USER_SUCCESS,
          payload: {
            response: userData,
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
