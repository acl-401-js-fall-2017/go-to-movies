import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Api_Key = process.env.REACT_APP_OMDB;

class App extends Component {
  constructor() {
    super();
    this.state ={
      items: [],
      search: 'rambo',
    };
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
        this.setState({ items });
        console.log('items', this.state.items);
      }
      );  
  }


  changeResource(search) {
    this.setState({ search }, () => {
      this.fetchMovies(search);
    });
  }
  
  render() {

    const list = (
      <div>
        {this.state.items.map(item => <div key={item.imdbID}>
          <h2> {item.Title} </h2>
          <h3>Released: {item.Year} </h3>
          <img src={item.Poster} alt='movie poster'/>
        </div>)}
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <label>Search Movies : <input name='search' value={this.state.search}
            onChange={({ target }) => this.changeResource(target.value)}/>
          </label>
        </div>
        <div>{list}</div>
      </div>
    );
  }
}

export default App;
