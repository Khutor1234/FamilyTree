import { combineReducers } from 'redux';

import userReducer from './userReducer.js';
import treeReducer from './treeReducer.js';

const reducers = combineReducers({
  userReducer,
  treeReducer,
});

export default reducers;
