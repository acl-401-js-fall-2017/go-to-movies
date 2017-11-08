import React, { Component } from 'react';
import './App.css';
require('dotenv').config();

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      items : [],
      searchQuery : 'Tornado'
    };
  }

  componentDidMount() {
    this.loadResource();
  }

  async loadResource() {
    const response = await fetch(`http://www.omdbapi.com/?s=${encodeURI(this.state.searchQuery)}&apikey=${omdbKey}`)
    const body = await response.json();
    console.log(`Fetching from url http://www.omdbapi.com/?s=${encodeURI(this.state.searchQuery)}&apikey=${omdbKey}`);
    console.log('Body response is', body);
    if (body.Response === 'True') {
      this.setState({ items: body.Search });
      }
    else {
      this.setState({ items: [] });
    }
  }
  
  handleNewSearch(value) {
    console.log('changing searchQuery to', value);
    this.loadResource({ value });
    this.setState({ searchQuery: value });
  }

  render() {
    const { items, searchQuery } = this.state;
    console.log('items array is', items);

    const list = (
      <ul>
        {items.map(item => <li key={item.imdbID}>{item.Title}</li>)}  
      </ul>
    );

    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">MovieSearch.org</h1>
        </header>
        <section className="App-intro">
          <Input searchQuery={searchQuery} onNewSearch={query => this.handleNewSearch(query)}/>
          {list}
        </section>
      </div>
    );
  }
}

class Input extends Component {
  render() {
    const { searchQuery, onNewSearch } = this.props;
    console.log('in Input, searchQuery is', searchQuery);
    return (
      <input name="searchText" value={searchQuery}
        onChange={({ target }) => onNewSearch(target.value)}/>
    );
  }
}

export default App;
