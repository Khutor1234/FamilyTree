import { combineReducers } from 'redux';

import userReducer from './userReducer.js';

const reducers = combineReducers({
  userReducer,
});

export default reducers;
