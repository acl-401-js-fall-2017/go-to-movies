import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieList from './Movies';
import Details from './Details';

const Api_Key = process.env.REACT_APP_OMDB;

class App extends Component {
  constructor() {
    super();
    this.state ={
      items: [],
      search: 'rambo',
      details: null,
      loading: false,
      displayMovies: false
    };
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }
  
  componentDidMount() {
    this.fetchMovies(this.state.search);
  }
  
  fetchMovies(search){
   
    fetch(`http://www.omdbapi.com/?s=${search}&plot=short&r=json&apikey=${Api_Key}`)
      .then(res => {
        if(!res.status === 200) {
          console.log('Looks like there was a problem. Status Code: ' +
          res.status);
          return;
        }else {
          return res.json();
        }
      })
      .then(res => {
        const items = res.Response === 'True' ? res.Search : [];
        this.setState({ 
          items,
          loading: false,
          displayMovies: true
        });
        console.log('items', this.state.items);
      }
      );  
  }

  changeResource(search) {
    this.setState({ search }, () => {
      this.fetchMovies(search);
    });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.changeResource(event.target.search.value);
  }




  fetchDetails(details){
    
    fetch(`http://www.omdbapi.com/?apikey=${Api_Key}&t=${details}`)
      .then(res => {
        if(!res.status === 200) {
          console.log('Looks like there was a problem. Status Code: ' +
           res.status);
          return;
        }else {
          return res.json();
        }
      })
      .then(res => {
        const details = res;
        this.setState({ 
          details,
          displayMovies: false
        });
        console.log('details', this.state.details);
      }
      );  
  }

  changeDetailResource(details) {
    this.setState({ details }, () => {
      this.fetchMovies(details);
    });
  }

  

  
  render() {
    const { items, search, loading, details , displayMovies } = this.state;
  
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Go to Movies</h1>
        </header>
        <div className="search">
          <form onSubmit={this.onSearchSubmit}>
            <input name='search' defaultValue={search}/>
            <input type="submit" value="search movies"/>
          </form>
          
        </div>
        { displayMovies ? (
          <MovieList 
            items={items}
            loading={loading}
            onDetails={(event) => {
              event.preventDefault();
              console.log(event.target.id);
              this.fetchDetails(event.target.id);
            }}
          />
        ) : (
          <Details 
            details={details}
            onGoBack={()=> this.setState({ displayMovies: true })}/>
        ) }
       
      </div>
      
    );
  }
}

export default App;
