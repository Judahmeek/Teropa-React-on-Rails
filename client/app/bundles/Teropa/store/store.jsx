import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';

import reducer from '../reducers/reducer';
import rootSaga from './sagas';

export default props => {
  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    $$store: Immutable.fromJS(props),
  };

  // https://github.com/reactjs/react-router-redux
  const reducers = combineReducers({
    $$store: reducer,
    routing: routerReducer,
  });

  const sagaMiddleware = createSagaMiddleware();
  const composedStore = compose(
    applyMiddleware(sagaMiddleware),
  );
  const storeCreator = composedStore(createStore);
  const store = { ...storeCreator(reducers, initialState),
                  runSaga: sagaMiddleware.run };
  return store;
};