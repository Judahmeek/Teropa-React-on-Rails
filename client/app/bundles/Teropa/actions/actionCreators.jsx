import actionTypes from '../constants/actionTypes';
import requestManager from '../../../libs/requestManager';

export function next() {
  return dispatch => {
    return (
      requestManager
        .submitEntity({ type: actionTypes.NEXT })
        .then(res => dispatch(setState(res.data)))
    );
  };
}

export function setState(state) {
  return {
    type: actionTypes.SET_STATE,
    state
  };
}

export function restart() {
  return dispatch => {
    return (
      requestManager
        .submitEntity({ type: actionTypes.RESTART })
        .then(res => dispatch(setState(res.data)))
    );
  };
}

export function vote(entry) {
  return dispatch => {
    const vote = {
          type: actionTypes.VOTE,
          id: entry.get('id')
        };
    dispatch(vote);
    return (
      requestManager
        .submitEntity(vote)
        .then(res => dispatch(setState(res.data)))
    );
  };
}