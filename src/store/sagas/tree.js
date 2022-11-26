/* eslint-disable no-loop-func */
import { all, takeLatest, call, put, select } from "redux-saga/effects";

import { reduxSagaFirebase as rsf } from "../../utils/service";
import { TREE } from "../types";

function* editUserSaga({ payload: { data, successCallback } }) {
  try {
    const {
      treeReducer: { tree },
    } = yield select();

    const user = tree.find((el) => el.id === data?.id);
    yield call(rsf.firestore.setDocument, `users/${data.id}`, {
      ...user,
      ...data,
    });

    yield put({
      type: TREE.EDIT_USER_SUCCESS,
    });
    successCallback && successCallback();
  } catch (err) {
    yield put({
      type: TREE.EDIT_USER_FAILURE,
      payload: {
        errors: {
          status: err?.response?.status,
          message: err?.response?.data?.message,
        },
      },
    });
  }
}

function* getTreeSaga() {
  try {
    const snapshot = yield call(rsf.firestore.getCollection, "users");
    const getTime = (time) => {
      if (time) {
        return new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
      }
      return "";
    };
    let users = [];
    snapshot?.forEach((user) => {
      users = [
        ...users,
        {
          ...user.data(),
          id: user.id,
          born: {
            ...user.data().born,
            date: getTime(user.data().born.date),
          },
          died: {
            ...user.data().died,
            date: getTime(user.data().died.date),
          },
        },
      ];
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

function* addUserSaga({ payload: { role, userId, user, successCallback } }) {
  try {
    const {
      treeReducer: { tree },
    } = yield select();
    const prevUser = tree.find((el) => el.id === userId);

    let data = { spouses: [], siblings: [], parents: [], children: [] };
    const { id } = yield call(rsf.firestore.addDocument, "users", {
      ...data,
      ...user,
    });

    if (role === "spouses") {
      const children = [...prevUser.children];
      const spouses = [
        {
          id: userId,
          type: "married",
        },
      ];

      yield call(rsf.firestore.setDocument, `users/${userId}`, {
        ...prevUser,
        spouses: [{ id, type: "married" }],
      });

      let n = 0;

      while (n < prevUser.children.length) {
        const child = tree.find(
          (item) => item.id === prevUser?.children[n]?.id
        );
        yield call(rsf.firestore.setDocument, `users/${child.id}`, {
          ...child,
          parents: [...child.parents, { id, type: "blood" }],
        });
        n++;
      }

      data = {
        ...data,
        children,
        spouses,
      };
    } else if (role === "parents") {
      let spouses = [];
      const children = [
        ...prevUser.siblings,
        { id: prevUser.id, type: "blood" },
      ];

      if (prevUser?.parents[0]?.id) {
        spouses = [{ id: prevUser.parents[0].id, type: "married" }];
        const spouse = tree.find((el) => el.id === prevUser.parents[0].id);
        yield call(
          rsf.firestore.setDocument,
          `users/${prevUser.parents[0].id}`,
          {
            ...spouse,
            spouses: [
              {
                id,
                type: "married",
              },
            ],
          }
        );
      }

      yield call(rsf.firestore.setDocument, `users/${userId}`, {
        ...prevUser,
        parents: [
          ...prevUser.parents,
          {
            id,
            type: "blood",
          },
        ],
      });

      let n = 0;

      while (n < prevUser.siblings.length) {
        const sibling = tree.find(
          (item) => item.id === prevUser?.siblings[n]?.id
        );

        yield call(rsf.firestore.setDocument, `users/${sibling.id}`, {
          ...sibling,
          parents: [...sibling.parents, { id, type: "blood" }],
        });
        n++;
      }

      data = {
        ...data,
        children,
        spouses,
      };
    } else if (role === "children") {
      let siblings = [...prevUser.children];
      let parents = [
        {
          id: userId,
          type: "blood",
        },
      ];

      if (prevUser?.spouses[0]?.id) {
        let spouse = tree.find((el) => el.id === prevUser.spouses[0].id);
        parents = [
          ...parents,
          {
            id: spouse.id,
            type: "blood",
          },
        ];

        yield call(
          rsf.firestore.setDocument,
          `users/${prevUser.spouses[0].id}`,
          {
            ...spouse,
            children: [
              ...spouse.children,
              {
                id,
                type: "blood",
              },
            ],
          }
        );
      }

      yield call(rsf.firestore.setDocument, `users/${userId}`, {
        ...prevUser,
        children: [
          ...prevUser.children,
          {
            id,
            type: "blood",
          },
        ],
      });

      let n = 0;

      while (n < prevUser.children.length) {
        const child = tree.find(
          (item) => item.id === prevUser?.children[n]?.id
        );

        yield call(rsf.firestore.setDocument, `users/${child.id}`, {
          ...child,
          siblings: [...child.siblings, { id, type: "blood" }],
        });
        n++;
      }

      data = {
        ...data,
        parents,
        siblings,
      };
    }

    yield call(rsf.firestore.setDocument, `users/${id}`, {
      ...data,
      ...user,
    });

    yield put({
      type: TREE.ADD_USER_SUCCESS,
      payload: {
        response: null,
      },
    });
    successCallback && successCallback();
  } catch (err) {
    yield put({
      type: TREE.ADD_USER_FAILURE,
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
  yield all([takeLatest(TREE.EDIT_USER, editUserSaga)]);
  yield all([takeLatest(TREE.GET_TREE, getTreeSaga)]);
  yield all([takeLatest(TREE.ADD_USER, addUserSaga)]);
}
