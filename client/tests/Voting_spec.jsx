import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate,
} from 'react-addons-test-utils';
import { expect } from 'chai';
import Immutable, { Map } from 'immutable';
import { Voting } from '../app/bundles/Teropa/containers/Voting';

describe('Voting', () => {
  it('renders a pair of buttons', () => {
    let component;
    const pair = Immutable.fromJS([{ id: 1, name: 'Trainspotting', total_votes: 5 },
                         { id: 2, name: '28 Days Later', total_votes: 0 }]);
    renderIntoDocument(
      <Voting
        ref={n => { component = n; }}
        pair={pair}
      />,
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 Days Later');
  });

  it('invokes callback when a button is clicked', () => {
    let component;
    let votedWith;
    const pair = Immutable.fromJS([{ id: 1, name: 'Trainspotting', total_votes: 5 },
                         { id: 2, name: '28 Days Later', total_votes: 0 }]);

    renderIntoDocument(
      <Voting
        ref={n => { component = n; }}
        pair={pair}
        vote={(entry) => { votedWith = entry; }}
      />,
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).to.equal(Map({ id: 1, name: 'Trainspotting', total_votes: 5 }));
  });

  it('adds label to the voted entry', () => {
    let component;
    const pair = Immutable.fromJS([{ id: 1, name: 'Trainspotting', total_votes: 5 },
                         { id: 2, name: '28 Days Later', total_votes: 0 }]);
    renderIntoDocument(
      <Voting
        ref={n => { component = n; }}
        pair={pair}
        hasChosen={1}
      />,
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.contain('Chosen');
  });

  it('renders just the winner when there is one', () => {
    let component;
    renderIntoDocument(
      <Voting
        ref={n => { component = n; }}
        winner="Trainspotting"
      />,
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    expect(buttons.length).to.equal(0);

    const winner = component.winner;
    expect(winner.textContent).to.contain('Trainspotting');
  });

  it('renders as a pure component', () => {
    let component;
    const pair = Immutable.fromJS([{ id: 1, name: 'Trainspotting', total_votes: 5 },
                         { id: 2, name: '28 Days Later', total_votes: 0 }]);
    const container = document.createElement('div');
    ReactDOM.render(
      <Voting
        ref={n => { component = n; }}
        pair={pair}
      />,
      container,
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    pair[0] = 'Sunshine';
    ReactDOM.render(
      <Voting
        ref={n => { component = n; }}
        pair={pair}
      />,
      container,
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');
  });

  it('does update DOM when prop changes', () => {
    let component;
    const pair = Immutable.fromJS([{ id: 1, name: 'Trainspotting', total_votes: 5 },
                         { id: 2, name: '28 Days Later', total_votes: 0 }]);
    const container = document.createElement('div');
    ReactDOM.render(
      <Voting
        ref={n => { component = n; }}
        pair={pair}
      />,
      container,
    );

    let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Trainspotting');

    const newPair = pair.set(0, Map({ id: 3, name: 'Sunshine', total_votes: 0 }));
    ReactDOM.render(
      <Voting
        ref={n => { component = n; }}
        pair={newPair}
      />,
      container,
    );
    firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
    expect(firstButton.textContent).to.equal('Sunshine');
  });
});
