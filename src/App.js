import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'; 
import dotEnv from 'dotenv';
dotEnv.config();

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

const name = 'lame';

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
    if (e.charCode == 13) {
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
      if(body.Response === 'True'){
        this.setState({ isNotFound: false });
        this.setState({ isLoading: false });
        this.setState({ results: body.Search });
      } else{
        this.setState({ isLoading: false });
        this.setState({ isNotFound: true });
        this.setState({ results: [] });
      }
    },1000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
         
        <div className="main" style={{ display:'flex', justifyContent:'center' }}>
          <div className="wrraper">
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

            <Loading isLoading={this.state.isLoading}>
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">LoadingResults</h1>
            </Loading>
            <NotFound isNotFound={this.state.isNotFound}>
              <div style={{ display:'flex', justifyContent:'center' }}>
                <Pug alt={''}
                  src="https://static1.squarespace.com/static/594974c0e58c62484cbd42f9/t/594986a45a730f2283302fc9/1497992070607/img_2835.jpg"
                />
              </div>
              <h1 className="App-title">No results were found to match the search</h1>
            </NotFound>

          </div>
        </div>
        
        <p className="App-intro">
        </p>
      </div>
    );
  }
}


class Movies extends Component {
  render() {
    const { results } =this.props;
    return(
      <ol>
        {results.map((result, i) => <li key={i}>{result.Title}</li>)}
      </ol>
    );
  }
}


export default App;

const Pug = styled.img`
width:80%;
height:400px;
`;

const NotFound = styled.div`
display: ${props => props.isNotFound ? 'flex' : 'none'};
flex-direction: column;
`;

const Loading = styled.div`
  display: ${props => props.isLoading ? 'flex' : 'none'};
  flex-direction: column;
`;

const SearchInput = styled.input`
  width: ${props => props.isFocused ? '350px' : '300px'} ;
  height: ${props => props.isFocused ? '40px' : '30px'};
  text-align: center;
`;