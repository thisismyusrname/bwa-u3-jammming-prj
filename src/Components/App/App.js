import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'Playlist',
      playlistTracks: []
    };

    this.addTrack=this.addTrack.bind(this);
    this.removeTrack=this.removeTrack.bind(this);
    this.updatePlaylistName=this.updatePlaylistName.bind(this);
    this.savePlaylist=this.savePlaylist.bind(this);
    this.search=this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    } else {
      let newTrack = this.state.playlistTracks;
      newTrack.push(track);
      this.setState({
        playlistTracks: newTrack
      });
    }
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    const oldTracks = tracks.filter(removedTrack => removedTrack.id !== track.id);
    this.setState({
      playlistTracks: oldTracks
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(id => {
      return id.uri;
    });
    if (this.state.playlistTracks.length && this.state.playlistName) {
      Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      });
    }
  }

  search(term) {
    Spotify.search(term).then(response => {
      this.setState({
        searchResults: response
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove= {this.removeTrack}
            onNameChange = {this.updatePlaylistName}
            onSave = {this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
