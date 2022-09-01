import { all, fork } from 'redux-saga/effects';

import user from './user.mjs.js';

export default function* root() {
  yield all([fork(user)]);
}
