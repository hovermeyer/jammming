import React from "react";
import PlaylistView from "../PlaylistView/PlaylistView.js"
import "./PlaylistList.css"

//Purpose: displays the users playlists
class PlaylistList extends React.Component{
  constructor(props){
    super(props);
  }




  render(){
    return(
    <div className="PlaylistList">
      <h2>My Playlists</h2>
      {this.props.playlists.map((playlist)=>{
        return <PlaylistView className="Playlist"
                              playlist={playlist}
                              key = {playlist.id}
                              loadPlaylist ={this.props.loadPlaylist} />

      })}

    </div>)
  }
}
PlaylistList.defaultProps = {playlists: []};


export default PlaylistList;

/*     
*/