import React, { Component } from 'react';
import './App.css';
const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      items : [],
      searchQuery : ''
    };
  }

  componentDidMount() {
    this.loadResource();
  }

  async loadResource() {
    const response = await fetch(`http://www.omdbapi.com/?s=${encodeURI(this.state.searchQuery)}&apikey=${omdbKey}`)
    const body = await response.json();
    if (body.Response === 'True') {
      this.setState({ items: body.Search });
      }
    else {
      this.setState({ items: [ {Title:'nothing', imdbID:'nope'} ] });
    }
  }
  
  handleNewSearch(value) {
    this.setState({ searchQuery: value }, () => {
      this.loadResource({ value });
    })
  }

  render() {
    const { items, searchQuery} = this.state;
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
        <input name="searchText" value={searchQuery}
        onChange={({ target }) => this.handleNewSearch(target.value)}/>          
        {list}
        </section>
      </div>
    );
  }
}

export default App;
