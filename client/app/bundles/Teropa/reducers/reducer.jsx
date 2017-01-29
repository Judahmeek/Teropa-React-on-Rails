import Immutable from 'immutable';
import actionTypes from '../constants/actionTypes';

export const $$initialState = Immutable.fromJS({
  $$pair: {},
});

function setState($$state, newState) {
  const $$mergedState = $$state.mergeIn(['$$pair'], Immutable.fromJS(newState));
  const idComparison = [$$state.getIn(['$$pair', 0, 'id']) === $$mergedState.getIn(['$$pair', 0, 'id']),
    $$state.getIn(['$$pair', 1, 'id']) === $$mergedState.getIn(['$$pair', 1, 'id'])];
  if ($$mergedState.get('hasChosen') && !(idComparison[0] && idComparison[1])) {
    return $$mergedState.remove('hasChosen');
  }
  return $$mergedState;
}

function vote($$state, id) {
  const idComparison = [$$state.getIn(['$$pair', 0, 'id']) === id,
    $$state.getIn(['$$pair', 1, 'id']) === id];
  if (idComparison[0] || idComparison[1]) {
    return $$state.set('hasChosen', id);
  }
  return $$state;
}

export default function ($$state = Immutable.Map(), action) {
  switch (action.type) {
    case actionTypes.SET_STATE:
      return setState($$state, action.state);
    case actionTypes.VOTE:
      return vote($$state, action.id);
    default:
      return $$state;
  }
}
