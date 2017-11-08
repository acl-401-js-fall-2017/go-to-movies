import React, { Component } from 'react';
import './App.css';
const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      items : [],
      searchQuery : '',
      loading: false
    };
  }

  componentDidMount() {
    this.loadResource();
  }

  async loadResource() {
    this.setState({ loading:true });
    const response = await fetch(`http://www.omdbapi.com/?s=${encodeURI(this.state.searchQuery)}&apikey=${omdbKey}`)
    const body = await response.json();
    if (body.Response === 'True') {
      this.setState({ items: body.Search, loading: false });
      }
    else {
      this.setState({ items: [ {Title:'nothing', imdbID:'nope'} ], loading: false });
    }
  }
  
  handleNewSearch(value) {
    this.setState({ searchQuery: value }, () => {
      this.loadResource({ value });
    })
  }

  render() {
    const { items, searchQuery, loading} = this.state;
    // const linkUrl = `http://www.imdb.com/title/${item}`
    const list = (
      <ul>
        {items.map((item, i)=> <li key={i}><a href='http://www.imdb.com/title/tt1688653' >{item.Title}</a></li>)}  
      </ul>
    );

    const load = <div>Loading...</div>;

    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">MovieSearch.org</h1>
        </header>
        <section className="App-intro">
        <input name="searchText" value={searchQuery}
        onChange={({ target }) => this.handleNewSearch(target.value)}/>          
        {loading ? load : list}
        </section>
      </div>
    );
  }
}

export default App;
