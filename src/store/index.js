// import storage from 'redux-persist/lib/storage';
// import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
// import { persistStore } from 'redux-persist';
// import { persistReducer } from 'redux-persist';
// import reducers from './reducers/index.js';

// const persistConfig = {
//   key: 'counter',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }).concat(logger),
// });

// let persistor = persistStore(store);

// export { store, persistor };

import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import logger from 'redux-logger';

import rootSaga from './sagas';
import rootReducer from './reducers';
import middleware, { sagaMiddleware } from './middleware';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
  },
  rootReducer
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = () => {
  const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(...middleware, logger))
  );

  const persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return {
    persistor,
    store,
  };
};

const { store, persistor } = configStore();

export { store, persistor };
