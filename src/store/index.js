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
