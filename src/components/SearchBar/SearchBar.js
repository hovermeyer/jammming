import React from "react"
import "./SearchBar.css"

//Purpose: provide input location
class SearchBar extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

//Purpose: call search
  search(){
    this.props.onSearch(this.state.term)
  }
//Purpose: set search term based on change event passed
  handleTermChange(e){
    let targetSearch = e.target.value;
    this.setState({term: targetSearch});
  }


//Purpose:  allow pressing enter to search
  keyPress(e){
    if(e.keyCode === 13){
      this.search();
    }
  }


  render(){
    return (
    <div className="SearchBar">
      <input onChange = {this.handleTermChange}  onKeyDown={this.keyPress} placeholder="Enter A Song, Album, or Artist" />
      <a onClick ={this.search} >SEARCH</a>
    </div>)
  }

}

export default SearchBar;
