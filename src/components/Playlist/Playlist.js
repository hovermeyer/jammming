import React from "react";
import TrackList from "../TrackList/TrackList.js"
import "./Playlist.css"

//Purpose: display a playlist with functionality to save it to Spotify
class Playlist extends React.Component{
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

//Purpose: change the name of the playlist
  handleNameChange(e){
    const name = e.target.value;
    this.props.onNameChange(name);
  }


  render(){
    return(
    <div className="Playlist">
      <input onChange = {this.handleNameChange} value={this.props.playlistName} />
        <TrackList onRemove = {this.props.onRemove} isRemoval = {true} tracks={this.props.playlistTracks} />
      <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      <a onClick={this.props.onSearch} className="Playlist-search">SEARCH RELATED</a>

    </div>)
  }
}


export default Playlist;
