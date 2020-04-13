import React from "react"
import "./Track.css"


//Purpose: display a specific track
class Track extends React.Component{
  constructor(props){
    super(props);
    this.addTrack= this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

//Purpose: check if add or remove, perform action accordingly
  renderAction(){
    if (this.props.isRemoval){
      return <a onClick ={this.removeTrack} className="Track-action">-</a>
    }else{
      return <a onClick ={this.addTrack} className="Track-action">+</a>
    }
  }
//Purpose: add a new track
  addTrack(){
    this.props.onAdd(this.props.track);
  }
//Purpose: remove a track
  removeTrack(){
    this.props.onRemove(this.props.track);
  }

//Purpose show the duration given in ms as minutes and seconds
  convertTime(){
    var d = new Date(this.props.track.duration);
    return ( d.toISOString().slice(14,-5)); // "4:59"
  }

  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album} | {this.convertTime()}</p>
        </div>
        {this.renderAction()}
      </div>
    )
  }

}


export default Track;
