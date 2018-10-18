import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from 'redux/reducers';
import rootSaga from 'redux/sagas';

const configureStore = (preloadedState, history) => {
  const sagaMiddleware = createSagaMiddleware();
  const reduxRouterMiddleware = routerMiddleware(history);
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(
      sagaMiddleware,
      reduxRouterMiddleware,
    ))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
