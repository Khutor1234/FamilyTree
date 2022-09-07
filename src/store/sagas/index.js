import { all, fork } from 'redux-saga/effects';

import user from './user.js';
import tree from './tree.js';

export default function* root() {
  yield all([fork(user)]);
  yield all([fork(tree)]);
}
