import React from 'react';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { expect } from 'chai';
import Immutable from 'immutable';
import { Results } from '../app/bundles/Teropa/containers/Results';

describe('Results', () => {
  it('renders entries with vote counts or zero', () => {
    let component;
    const pair = Immutable.fromJS([{ id: 1, name: 'Trainspotting', total_votes: 5 },
                         { id: 2, name: '28 Days Later', total_votes: 0 }]);
    renderIntoDocument(
      <Results
        ref={n => { component = n; }}
        pair={pair}
      />,
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('Trainspotting');
    expect(train).to.contain('5');
    expect(days).to.contain('28 Days Later');
    expect(days).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let component;
    let nextInvoked = false;

    const pair = Immutable.fromJS([{ id: 1, name: 'Trainspotting', total_votes: 5 },
                         { id: 2, name: '28 Days Later', total_votes: 0 }]);
    renderIntoDocument(
      <Results
        ref={n => { component = n; }}
        pair={pair}
        next={() => { nextInvoked = true; }}
      />,
    );
    Simulate.click(component.next);

    expect(nextInvoked).to.equal(true);
  });

  it('invokes the restart callback when restart button is clicked', () => {
    let component;
    let restartInvoked = false;

    const pair = Immutable.fromJS([{ id: 1, name: 'Trainspotting', total_votes: 5 },
                         { id: 2, name: '28 Days Later', total_votes: 0 }]);
    renderIntoDocument(
      <Results
        pair={pair}
        ref={n => { component = n; }}
        restart={() => { restartInvoked = true; }}
      />,
    );
    Simulate.click(component.restart);

    expect(restartInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    let component;
    renderIntoDocument(
      <Results
        ref={n => { component = n; }}
        winner="Trainspotting"
      />,
    );
    const winner = component.winner;
    expect(winner.textContent).to.contain('Trainspotting');
  });
});
