import actionTypes from '../constants/actionTypes';

export function setState(state) {
  return {
    type: actionTypes.SET_STATE,
    state,
  };
}

export function next() {
  return {
    type: actionTypes.NEXT,
  };
}

export function restart() {
  return {
    type: actionTypes.RESTART,
  };
}

export function vote(entry) {
  return {
    type: actionTypes.VOTE,
    id: entry.get('id'),
  };
}
