const clientID ="e7089f671bcf466cadac8945320843cb";
const uriRedirect ="http://localhost:3000/"
let accessToken ='';

let Spotify= {};
//Purpose: get the authorization using Implicit Grant to be able to interact with the spotify api
Spotify.getAccessToken= () =>{
  let currentLocation = window.location.href;
  if(accessToken){
    return accessToken;
  }else if(currentLocation.match(/access_token=([^&]*)/) && currentLocation.match(/expires_in=([^&]*)/)) {
    //userAccess not set yet, will need to get it
    let expiration = currentLocation.match(/expires_in=([^&]*)/)[1];
    accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
    window.setTimeout(() => accessToken = '', expiration * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  }else{
      //token && expiration do not exist, send user to get authorization
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${uriRedirect}`
  }
}

//Purpose: use Spotify API to get a list of tracks to display
Spotify.search=(term)=>{
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
     {headers:{Authorization:`Bearer ${Spotify.getAccessToken()}`}}).then(
       response =>{
           return  response.json();
       }
     ).then(
       jsonResponse =>{
         if (jsonResponse.tracks){          
           return jsonResponse.tracks.items.map(track => {
             return {
               id: track.id,
               artist: track.artists[0].name,
               album: track.album.name,
               name: track.name,
               URI: track.uri, 
               duration: track.duration_ms,
               link: track.href
             }
           })
         }

       }
     )

}

//Purpose: use Spotify API to get audio details for a number of tracks
Spotify.audioFeatures=(tracks)=>{
  return fetch(`"https://api.spotify.com/v1/audio-features/?ids=${tracks.join(",")}`,
     {headers:{Authorization:`Bearer ${Spotify.getAccessToken()}`}}).then(
       response =>{
           return  response.json();
       }
     ).then(
       jsonResponse =>{
         if (jsonResponse.tracks){
           return jsonResponse.tracks.items.map(track => {
             return {
               id: track.id,
               artist: track.artists[0].name,
               album: track.album.name,
               name: track.name,
               URI: track.uri, 
               duration: track.duration_ms,
               link:track.href
             }
           })
         }

       }
     )

}

//Purpose: save a playlist on spotify with playlistName and tracks
Spotify.savePlaylist = (playlistName, tracks)=>{
  if (!playlistName || !tracks.length){
    return
  }else{
    let header =    { Authorization: `Bearer ${accessToken}` };
    let userID;
    let playlistID;
    //fetch the user id
    fetch(`https://api.spotify.com/v1/me`,
       {headers:header}).then(
         response =>{
           if(response.ok){
             return  response.json();
           }
           throw new Error( "Network Error")
         },   networkError =>{
           console.log(networkError.message);
      }
       ).then(

         jsonResponse =>{
           if (jsonResponse.id){
             userID = jsonResponse.id
             }
           }
         ).then(
           jsonResponse =>{

 // user the userId and authorization to create the new playlist
 return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
    {method: 'POST', headers:header, body :JSON.stringify({name:playlistName})}).then(
      response =>{
        if(response.ok){
          return  response.json();
        }
        throw new Error ("Network Error");
      })
    }, networkError =>{
      console.log(networkError.message);
    }
    ).then(

      jsonResponse =>{
        if (jsonResponse.id){
          playlistID = jsonResponse.id
          }
        }
      ).then(
        jsonResponse =>{
          //Add tracks to the playlist
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
         {method: 'POST', headers:header, body:JSON.stringify({uris:tracks})}).then(
           response =>{
               return  response.json();
           })
         }
         )
   }
}

export default Spotify;
