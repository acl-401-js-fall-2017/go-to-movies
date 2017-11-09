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
      let pageNumber = 0;
      let allResults = [];
      while (true) {
        pageNumber++;
        let pageResponse = await fetch(`http://www.omdbapi.com/?s=${encodeURI(this.state.searchQuery)}&page=${pageNumber}&apikey=${omdbKey}`)
        let pageBody = await pageResponse.json();
        allResults = allResults.concat(pageBody.Search);
        if (allResults.length >= body.totalResults) break;
      }
      this.setState({ items: allResults, loading: false });
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
    const list = (
      <ul>
        {items.filter(item=>item).map((item, i, items)=> {
          return (<li key={i}><a href={'http://www.imdb.com/title/' + item.imdbID}>{item.Title}</a></li>)
      })}  
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
