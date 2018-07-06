import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends React.Component {
  render() {
    return(
      <div className="SearchResults">
        <h2>Results</h2>
          <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
      </div>
  )
  }
};

export default SearchResults;


/*import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
          <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
      </div>
    )
  }
};

export default SearchResults;
*/
