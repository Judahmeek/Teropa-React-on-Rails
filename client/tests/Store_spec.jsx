import React from 'react';
import {Map, List} from 'immutable';
import {expect} from 'chai';
import createStore from '../app/bundles/Teropa/store/store';

describe('Store', () => {

  it('creates a store based on given props', () => {
    const props = { vote: { pair: ['one', 'two'], tally: {'one': 1, 'two': 2} } };
    const store = createStore(props);
    expect(store.getState().$$store).to.equal(
      Map({
        "$$pair": Map({}),
        "$$props": Map({
          "vote": Map({
            "pair": List([ "one", "two" ]),
            "tally": Map({
              "one": 1,
              "two": 2
              })
            })
            })
        })
      );
  });
});