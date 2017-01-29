import actionTypes from '../constants/actionTypes';
import requestManager from '../../../libs/requestManager';

export function setState(state) {
  return {
    type: actionTypes.SET_STATE,
    state,
  };
}

export function next() {
  return dispatch => (
      requestManager
        .submitEntity({ type: actionTypes.NEXT })
        .then(res => dispatch(setState(res.data)))
    );
}

export function restart() {
  return dispatch => (
      requestManager
        .submitEntity({ type: actionTypes.RESTART })
        .then(res => dispatch(setState(res.data)))
    );
}

export function vote(entry) {
  return dispatch => {
    const action = {
      type: actionTypes.VOTE,
      id: entry.get('id'),
    };
    dispatch(action);
    return (
      requestManager
        .submitEntity(action)
        .then(res => dispatch(setState(res.data)))
    );
  };
}
