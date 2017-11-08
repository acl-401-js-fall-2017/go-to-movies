import React, { Component } from 'react';
import './App.css';
require('dotenv').config();

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      items : [],
      query : 'Tornado'
    };
  }

  componentDidMount() {
    this.loadResource();
  }

  async loadResource() {
    const response = await fetch(`http://www.omdbapi.com/?s=${this.state.query}&apikey=${omdbKey}`)
    const body = await response.json();
    console.log('BODY IS', body);
    this.setState({ items: body.Search })
  }
  

  render() {
    const { items } = this.state;

    const list = (
      <ul>
        {items.map(item => <li key={item.imdbID}>{item.Title}</li>)}  
      </ul>
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">MovieSearch.org</h1>
        </header>
        <p className="App-intro">
          :( UNDER CONSTRUCTION :(
        </p>
          {list}
      </div>
    );
  }
}

export default App;
