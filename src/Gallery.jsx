import React, { Component } from 'react';
import './App.css';

// This component holds a collection of top tracks from the artist
// Displayed with album photos and a playable preview of each track
class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false
    }
  }

  playAudio(previewUrl) {
    // Using JS Audio object here to paly the preview
    // And simple logic to implement play & pause
    let audio = new Audio(previewUrl);
    if (!this.state.playing) {
      audio.play();
      this.setState({
        playing: true,
        playingUrl: previewUrl,
        audio
      })
    } else {
      if (this.state.playingUrl === previewUrl) {
        this.state.audio.pause();
        this.setState({
          playing: false
        })
      } else {
        this.state.audio.pause();
        audio.play();
        this.setState({
          playing: true,
          playingUrl: previewUrl,
          audio
        })
      }
    }
  }

  render() {
    // Get the top tracks from App component as props
    const tracks = this.props.tracks;
    return (
      <div>
        {/* Map over all tracks to display album cover, play & pause button and a text for track title */}
        {
          tracks.map((track, k) => {
            const trackImg = track.album.images[0].url;
            return (
              <div
                key={k}
                className="track"
                onClick={() => this.playAudio(track.preview_url)}
              >
                <img
                  src={trackImg}
                  className="track-img"
                  alt="track"
                />
                <div className="track-play">
                  <div className="track-play-inner">
                    {/* Toggle between play & pause icon */}
                    {
                      (this.state.playingUrl === track.preview_url && this.state.playing === true)
                        ? <span>| |</span>
                        : <span>&#9654;</span>
                    }
                  </div>
                </div>
                <p className="track-text">
                  {track.name}
                </p>
              </div>
            )
          }
        )}
      </div>
    )
  }
}

export default Gallery;
