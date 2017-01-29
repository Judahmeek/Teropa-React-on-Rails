import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import Immutable from 'immutable';
import {Results} from '../app/bundles/Teropa/containers/Results';
import {expect} from 'chai';

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = Immutable.fromJS([{'id': 1, 'name': 'Trainspotting', 'total_votes': 5},
                         {'id': 2, 'name': '28 Days Later', 'total_votes': 0}]);
    const component = renderIntoDocument(
      <Results pair={pair} />
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
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = Immutable.fromJS([{'id': 1, 'name': 'Trainspotting', 'total_votes': 5},
                         {'id': 2, 'name': '28 Days Later', 'total_votes': 0}]);
    const component = renderIntoDocument(
      <Results pair={pair}
               next={next} />
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });
  
  it('invokes the restart callback when restart button is clicked', () => {
    let restartInvoked = false;

    const pair = Immutable.fromJS([{'id': 1, 'name': 'Trainspotting', 'total_votes': 5},
                         {'id': 2, 'name': '28 Days Later', 'total_votes': 0}]);
    const component = renderIntoDocument(
      <Results pair={pair}
               restart={() => restartInvoked = true} />
    );
    Simulate.click(ReactDOM.findDOMNode(component.refs.restart));

    expect(restartInvoked).to.equal(true);
  });
  
  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Trainspotting" />
    );
    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });

});