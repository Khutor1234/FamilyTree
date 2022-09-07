import createSagaMiddleware from 'redux-saga';
// import logger from "redux-logger";

export const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

/* istanbul ignore next */
/*if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}*/

export default middleware;
