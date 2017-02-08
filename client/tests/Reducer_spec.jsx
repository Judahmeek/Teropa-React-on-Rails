import { fromJS } from 'immutable';
import { expect } from 'chai';
import reducer from '../app/bundles/Teropa/reducers/reducer';
import * as actionCreators from '../app/bundles/Teropa/actions/actionCreators';
import actionTypes from '../app/bundles/Teropa/constants/actionTypes';

describe('Reducer', () => {
  describe('setState', () => {
    it('removes hasChosen when the pair ids change', () => {
      const state = fromJS({ '$$pair':[{ id: 1, name: 'Red', tally: 2 }, { id: 3, name: 'Blue', tally: 4 }], 'hasChosen': 1});
      const action = actionCreators.setState({ '$$pair': [
        { id: 2, name: 'Green', tally: 0 },
        { id: 3, name: 'Blue', tally: 0 }] });
      expect(reducer(state, action)).to.equal(fromJS({ '$$pair': [
        { id: 2, name: 'Green', tally: 0 },
        { id: 3, name: 'Blue', tally: 0 }] }));
    });

    it("handles empty vote responses", () => {
      const state = fromJS({ '$$pair':[{ id: 1, name: 'Red', tally: 2 }, { id: 3, name: 'Blue', tally: 4 }], 'hasChosen': 1});
      const action = actionCreators.setState();
      expect(reducer(state, action)).to.equal(state);
    });

    it('handles a winner', () => {
      const state = fromJS({ '$$pair':[{ id: 1, name: 'Red', tally: 2 }, { id: 3, name: 'Blue', tally: 4 }] });
      const action = actionCreators.setState({ "winner": "You'll never believe it!" });
      expect(reducer(state, action)).to.equal(fromJS({ '$$pair':[{ id: 1, name: 'Red', tally: 2 }, { id: 3, name: 'Blue', tally: 4 }], "winner": "You'll never believe it!" }));
    });
  });

  describe('Vote', () => {
    it('sets hasChosen if unset', () => {
      const state = fromJS({ '$$pair':[{ id: 1, name: 'Red', tally: 2 }, { id: 3, name: 'Blue', tally: 4 }] });
      const action = { type: actionTypes.VOTE, id: 1, };
      expect(reducer(state, action)).to.equal(state.merge({'hasChosen': 1}));
    });

    it('changes hasChosen', () => {
      const state = fromJS({ '$$pair':[{ id: 1, name: 'Red', tally: 2 }, { id: 3, name: 'Blue', tally: 4 }], 'hasChosen': 3 });
      const action = { type: actionTypes.VOTE, id: 1, };
      expect(reducer(state, action)).to.equal(state.set('hasChosen', 1));
    });
  });
});