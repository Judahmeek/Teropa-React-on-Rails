import { Map, List } from 'immutable';
import { expect } from 'chai';
import createStore from '../app/bundles/Teropa/store/store';

describe('Store', () => {
  it('creates a store when given a pair prop', () => {
    const props = { $$pair: [{ id: 1, name: 'Red', tally: 2 }, { id: 3, name: 'Blue', tally: 4 }] };
    const store = createStore(props);
    expect(store.getState().$$store).to.equal(
      Map({
        $$pair: List([
          Map({
            id: 1,
            name: 'Red',
            tally: 2,
          }),
          Map({
            id: 3,
            name: 'Blue',
            tally: 4,
          }),
        ]),
      }),
    );
  });

  it('creates a store when given a winner prop', () => {
    const props = { winner: "You'll never believe it!" };
    const store = createStore(props);
    expect(store.getState().$$store).to.equal(Map({ winner: "You'll never believe it!" }));
  });
});
