import actionTypes from '../constants/actionTypes';
import Immutable from 'immutable';

export const $$initialState = Immutable.fromJS({
  $$pair: {}
});

function setState($$state, newState) {
  let mergedState = $$state.merge(newState);
  const oldPair = $$state.get('$$pair', Immutable.List());
  const newPair = mergedState.get('$$pair', Immutable.List());
  if (mergedState.get('hasChosen') && !oldPair.equals(newPair)) {
    return mergedState.remove('hasChosen');
  }
  return mergedState;
}

function vote($$state, entry) {
  const currentPair = $$state.get('$$pair');
  if (currentPair && currentPair.includes(entry)) {
    return $$state.set('hasChosen', entry)
  } else {
    return $$state;
  }
}

export default function($$state = Immutable.Map(), action) {
  switch (action.type) {
  case actionTypes.SET_STATE:
    return setState($$state, action.state);
  case actionTypes.VOTE:
    return vote($$state, action.entry);
  }
  return $$state;
}
