import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';

import reducer from '../reducers/reducer';

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

  const composedStore = compose(
    applyMiddleware(thunkMiddleware),
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducers, initialState);
  return store;
};
