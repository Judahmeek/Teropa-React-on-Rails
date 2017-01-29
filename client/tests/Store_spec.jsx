import { Map, List } from 'immutable';
import { expect } from 'chai';
import createStore from '../app/bundles/Teropa/store/store';

describe('Store', () => {
  it('creates a store based on given props', () => {
    const props = [{ id: 1, name: 'Red', tally: 2 }, { id: 3, name: 'Blue', tally: 4 }];
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
});
