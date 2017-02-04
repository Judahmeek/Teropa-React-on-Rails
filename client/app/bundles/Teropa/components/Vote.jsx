import React from 'react';

export default class Vote extends React.PureComponent {
  getPair() {
    return this.props.pair || [];
  }
  hasChosen(entry) {
    return this.props.hasChosen === entry.get('id');
  }
  render() {
    return (<div className="voting">
      {this.getPair().map(entry =>
        <button
          key={entry}
          onClick={() => this.props.vote(entry)}
        >
          <h1>{entry.get('name')}</h1>
          {this.hasChosen(entry) ?
            <div className="label">Chosen</div> :
            null}
        </button>,
      )}
    </div>);
  }
}
