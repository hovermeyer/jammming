import React from "react"
import "./SearchBar.css"
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


//Purpose: provide input location
class SearchBar extends React.Component{

  constructor(props){
    super(props);
    this.state = {durationRange:[0,10000]};
    this.search = this.search.bind(this);
    this.advancedSearch = this.advancedSearch.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
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

  handleSearchChange = (event, newValue) => {
    this.setState({durationRange:newValue});
  };

  //Purpose: allow advanced search options to be visible
  advancedSearch(){
    this.props.onAdvancedSearch();
  }

  //Purpose: display either advanced search options, or basic search options
  renderAdvanced(){
    if (this.props.advancedSearchVisible){
      return (<div>
        <Button onClick ={this.advancedSearch} > Regular Search</Button>

        <Slider
        value={this.state.durationRange}
        onChange={this.handleSearchChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        //getAriaValueText={valuetext}
        />
      </div>)
    }else{
      return  <Button onClick ={this.advancedSearch} > More Options</Button>
    }
  }


  render(){
    return (
    <div className="SearchBar">
      <input onChange = {this.handleTermChange}  onKeyDown={this.keyPress} placeholder="Enter A Song, Album, or Artist" />
      <ButtonGroup size="large" variant="contained" color="primary" aria-label="contained primary button group">

        <Button onClick ={this.search} >Search</Button>
      </ButtonGroup>

    </div>)
  }

}

export default SearchBar;
