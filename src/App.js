import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'; 

const omdbKey = process.env.REACT_APP_OMDB_API_KEY || '';

class App extends Component {
  constructor(){
    super();
    this.state = {
      search: 'Search For Your Favorite Movie',
      isLoading: true,
      isFocused: false,
      
    };
  }

  onFocus = () => {
    this.setState({ isFocused: true });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
         
        <div className="main" style={{ display:'flex', justifyContent:'center' }}>
          <div className="wraper" style={{ display:'flex', flexDirection:'column' }}>
            <SearchInput 
              isFocused={this.state.isFocused}
              name='search'
              value={this.state.search}
              onFocus={this.onFocus}
            />
            <ul>
              <li>Movies go here</li>
            </ul>
          </div>
        </div>
        
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;

const SearchInput = styled.input`
  width: ${props => props.isFocused ? '500px' : '300px'} ;
  height: ${props => props.isFocused ? '80px' : '30px'};
  text-align: center;
`;
