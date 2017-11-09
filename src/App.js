import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'; 
import dotEnv from 'dotenv';
import Movies from './Movies';
import NotFound from './notFound'; 

dotEnv.config();

const omdbKey = process.env.REACT_APP_OMDB_API_KEY || '<enter Key here';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isNotFound: false,
      search: 'Search For Your Favorite Movie',
      loading: false,
      isLoading: false,
      isFocused: false,
      results: []
    };
  }

  onEnter = (e) => {
    if (e.charCode === 13) {
      this.doSearch(this.state.search);
      this.setState({ search: '' });
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
         
        <div className="main" style={{ display:'flex', justifyContent:'center' }}>
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
            <Movies results={this.state.results}/>

            <DisplayFlex shouldDisplay={this.state.isLoading}>
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">LoadingResults</h1>
            </DisplayFlex>

            <NotFound isNotFound={this.state.isNotFound}/>

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