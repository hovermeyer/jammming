import React from "react"
import "./PlaylistView.css"


//Purpose: display a specific track
class PlaylistView extends React.Component{
  constructor(props){
    super(props);
    this.loadPlaylist= this.loadPlaylist.bind(this);
  }

//Purpose: add a new track
  loadPlaylist(){
    this.props.loadPlaylist(this.props.playlist);
  }



  render(){
    return(
      <div className="Playlist">
        <div className="Playlist-information">
          <h3>{this.props.playlist.name}</h3>
          <p>{this.props.playlist.totalTracks} Tracks</p>
        </div>
        <a onClick={this.loadPlaylist} className="Playlist-action">Load</a>
      </div>
    )
  }

}

export default PlaylistView;
