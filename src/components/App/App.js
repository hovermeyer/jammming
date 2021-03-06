import React from "react"
import SearchBar from "../SearchBar/SearchBar.js"
import SearchResults from "../SearchResults/SearchResults.js"
import Playlist from "../Playlist/Playlist.js"
import PlaylistList from "../PlaylistList/PlaylistList.js"


import Spotify from "../../util/Spotify.js"
import "./App.css"


//Purpose: search Spotify for tracks and create playlists from these tracks.
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {searchResults :[],
    playlistName: "My Playlist Name Test",
    playlistTracks : [],
    playlists:this.getPlaylists(),
    advancedSearchVisible:false}
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack =this.removeTrack.bind(this);
    this.updatePlaylistName= this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.recommendations = this.recommendations.bind(this);
    this.advancedSearch = this.advancedSearch.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
    this.loadPlaylist = this.loadPlaylist.bind(this)
  }

//Purpose: add a track to the playlist
  addTrack(track){
   //Confirm track is not already on the playlist
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
     return;
    }
   //push track to the playlistTracks
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks})
  }

//Purpose: change the name of the playlist
 updatePlaylistName(name){
   this.setState({
     playlistName:name
   })
 }

//Purpose:  remove a track from the playlist
 removeTrack(track){
  let tempArray= this.state.playlistTracks.filter(savedTrack =>  savedTrack.id !== track.id)
   this.setState(
     {playlistTracks: tempArray})
 }

//Purpose: save the playlist
 savePlaylist(){
   let trackURIs = this.state.playlistTracks.map(track => {return track.URI})
   Spotify.savePlaylist(this.state.playlistName, trackURIs)
   //I probably want to load them here after save to spotify
 }


//Purpose: search for tracks to display as search results
 search(searchTerm){
   Spotify.search(searchTerm).then(searchResults =>{this.setState({searchResults:searchResults})});
 }

 //Purpose: show advanced search options or not
 advancedSearch(){
   let newVisible = !(this.state.advancedSearchVisible);
   this.setState({advancedSearchVisible:newVisible});
 }

 getPlaylists(){
   Spotify.getPlaylists().then(playlists=>{this.setState({playlists:playlists})});
 }

 loadPlaylist(playlistInfo){
  Spotify.loadPlaylist(playlistInfo.id).then(playlist=>{
    this.setState({playlistTracks: playlist, playlistName: playlistInfo.name})})
  

 }

 //Purpose: allow to search based on tracks added to the playlist
 recommendations(){
  let seedTracks = this.state.playlistTracks.map(track=>{return track.id}).slice(0,5).join(',')
  let searchTerms =(`seed_tracks=${seedTracks}`)

  Spotify.recommedations(searchTerms).then(searchResults =>{this.setState({searchResults:searchResults})});
 }

 render(){
  return (<div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch = {this.search} 
                 onAdvancedSearch = {this.advancedSearch}
                 advancedSearchVisible ={this.state.advancedSearchVisible}/>
      <div className="App-playlist">
        <PlaylistList playlists = {this.state.playlists}  
                      loadPlaylist = {this.loadPlaylist}/>

        <SearchResults onAdd = {this.addTrack} searchResults = {this.state.searchResults} />
        <Playlist onNameChange= {this.updatePlaylistName}
                  onRemove = {this.removeTrack}
                  onSave ={this.savePlaylist}
                  onSearch ={this.recommendations}
                  playlistName={this.state.playlistName}
                  playlistTracks = {this.state.playlistTracks} 
                  />

      </div>
      <div className="App-playlist">

      </div>
    </div>
  </div>)
  }
}


export default App;
