import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'; 
import dotEnv from 'dotenv';
import Movies from './Movies';
import NotFound from './notFound'; 
import Details from './Details';

dotEnv.config();

const omdbKey = process.env.REACT_APP_OMDB_API_KEY || '<enter Key here';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isNotFound: false,
      search: 'Search For Your Favorite Movie',
      isLoading: false,
      isFocused: false,
      results: [],
      selectedId: ''
    };
  }

  onEnter = (e) => {
    if (e.charCode === 13) {
      this.doSearch(this.state.search);
      this.setState({ search: '', selectedId:'' });
    }
  }

  onSearchChange = (e) => {
    this.setState({ search: e.target.value });
  }

  onFocus = () => {
    this.setState({ search : '' });
    this.setState({ isFocused: true });
  }

  offFocus = () => {
    this.setState({ isFocused: false });
  }

  setSelectedId = (id) => {
    this.setState({ selectedId: id });
  }

  async doSearch(search) {
    this.setState({ results: [] });
    this.setState({ isLoading: true });
    const url = encodeURI(`http://www.omdbapi.com/?s=${this.state.search}&plot=short&r=json&apikey=${omdbKey}`);
    const response = await fetch(url);
    const body = await response.json();
    setTimeout(()=>{
      this.setState({ 
        isLoading: false,
        isNotFound: body.Response !== 'True',
        results: body.Search || []
      });
    },500);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
         
        <div className="wrapper">

          <SearchInput 
            name='search'
            isFocused={this.state.isFocused}
            onKeyPress={this.onEnter}
            onFocus={this.onFocus}
            onBlur={this.offFocus}
            value={this.state.search}
            onChange={this.onSearchChange}
          />
          <div style={{ display:'flex', justifyContent:'center' }}>
            <NotFound isLoading={this.state.isLoading} isNotFound={this.state.isNotFound}/>
          </div>
          <DisplayFlex shouldDisplay={this.state.isLoading}>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">LoadingResults</h1>
          </DisplayFlex>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Movies results={this.state.results} setSelectedId={this.setSelectedId}/>
            <DisplayFlex shouldDisplay ={!this.state.isLoading}>
              <Details search= {this.state.search} isLoading={this.state.selectedId} selectedId={this.state.selectedId}/>
            </DisplayFlex>
          </div>

        </div>
        
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;

const DisplayFlex = styled.div`
display: ${props => props.shouldDisplay ? 'flex' : 'none'};
flex-direction: column;
`;

const SearchInput = styled.input`
  font-size: 16px;
  margin-bottom: 20px;
  width: ${props => props.isFocused ? '350px' : '300px'} ;
  height: ${props => props.isFocused ? '40px' : '30px'};
  text-align: center;
`;