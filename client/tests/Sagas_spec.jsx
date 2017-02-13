import { Map } from 'immutable';
import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';

import * as actionCreators from '../app/bundles/Teropa/actions/actionCreators';
import { next, vote, restart } from '../app/bundles/Teropa/store/sagas';
import requestManager from '../app/libs/requestManager';

describe('Sagas', () => {
  it('performs next async actions', () => {
    const action = actionCreators.next();
    const generator = next(action);

    let nextGen = generator.next();
    expect(nextGen.value).to.deep.equal(call(requestManager.submitEntity, action));

    const response = { data: 'data' };
    nextGen = generator.next(response);
    expect(nextGen.value).to.deep.equal(put(actionCreators.setState(response.data)));
  });

  it('performs restart async actions', () => {
    const action = actionCreators.restart();
    const generator = restart(action);

    let nextGen = generator.next();
    expect(nextGen.value).to.deep.equal(call(requestManager.submitEntity, action));

    const response = { data: 'data' };
    nextGen = generator.next(response);
    expect(nextGen.value).to.deep.equal(put(actionCreators.setState(response.data)));
  });

  it('performs vote async actions', () => {
    const action = actionCreators.vote(Map({ id: 1 }));
    const generator = vote(action);

    let nextGen = generator.next();
    expect(nextGen.value).to.deep.equal(call(requestManager.submitEntity, action));

    const response = { data: 'data' };
    nextGen = generator.next(response);
    expect(nextGen.value).to.deep.equal(put(actionCreators.setState(response.data)));
  });
});
