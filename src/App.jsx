import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';
import './App.css';

// Spotify public APIs
const BASE_URL = 'https://api.spotify.com/v1/search?';
const ALBUM_URL = 'https://api.spotify.com/v1/artists';

class App extends Component {
  constructor(props) {
    super(props);
    // Initialization of the state of the app
    this.state = {
      query: '',
      artist: null,
      tracks: []
    }
  }

  search() {
    // For testing purpose to see what's returned
    console.log('this.state', this.state);
    let FETCH_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;

    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      // For testing purpose to see whom are we getting
      console.log('artist', artist);

      // Update the artist state and also using the id of him/her to get a list of top tracks
      this.setState({artist});
      FETCH_URL = `${ALBUM_URL}/${artist.id}/top-tracks?country=US&`;
      fetch(FETCH_URL, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        console.log('artist\'s top tracks: ', json);
        const {tracks} = json; // ES6 shortcut to get objects out of json
        this.setState({tracks});
      })
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Spotify Quickies</div>
        <div className="row">
          <FormGroup className="col-lg-8 col-lg-offset-2">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Type an Artist's Name..."
                value={this.state.query}
                onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.search();
                  }
                }}
              />
              <InputGroup.Addon onClick={() => this.search()}>
                <Glyphicon glyph="search"></Glyphicon>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </div>
        {
          this.state.artist !== null ?
            <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
            :
            <div></div>
        }
      </div>
    )
  }
}

export default App;
