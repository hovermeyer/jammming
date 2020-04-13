import React from "react"
import Track from "../Track/Track.js"
import "./TrackList.css"


class TrackList extends React.Component{
  render(){
    return(
      <div className="TrackList">
      {
        this.props.tracks.map(track =>{
       return <Track
          onAdd={this.props.onAdd}
          track={track}
          key={track.id}
          duration ={track.duration}
          link = {track.link}
          onRemove= {this.props.onRemove}
          isRemoval = {this.props.isRemoval} /> })
     }
      </div>)
  }

}

//set a default blank list of tracks to ensure can use map if necessary
TrackList.defaultProps = {tracks: []};

export default TrackList;
