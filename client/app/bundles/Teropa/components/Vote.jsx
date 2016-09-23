import React from 'react';
import BaseComponent from 'libs/components/BaseComponent';

export default class Vote extends BaseComponent {
  getPair() {
    return this.props.pair || [];
  }
  hasChosen(entry) {
    return this.props.hasChosen === entry;
  }
  render() {
    return <div className="voting">
      {this.getPair().map(entry =>
        <button key={entry}
                onClick={() => this.props.vote(entry)}>
          <h1>{entry}</h1>
          {this.hasChosen(entry) ?
            <div className="label">Chosen</div> :
            null}
        </button>
      )}
    </div>;
  }
}