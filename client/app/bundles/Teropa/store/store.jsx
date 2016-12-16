import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import Immutable from 'immutable';

import reducers, { initialStates } from '../reducers';

export default props => {
  // This is how we get initial props Rails into redux.
  const $$pair = Immutable.fromJS(props);
  const { $$initialState } = initialStates;

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    $$store: $$initialState.merge({
      $$pair
    }),
  };

  // https://github.com/reactjs/react-router-redux
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer,
  });
  
  const composedStore = compose(
    applyMiddleware(thunkMiddleware)
  );
  const storeCreator = composedStore(createStore);
  const store = storeCreator(reducer, initialState);
  return store;
};
