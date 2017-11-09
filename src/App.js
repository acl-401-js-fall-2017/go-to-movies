import React, { Component } from 'react';
import './App.css';
const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      items : [],
      searchQuery : '',
      loading: false,
      results: 0,
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
      let pageNumber = 1;
      let allResults = [];

      while (true) {
        console.log(`http://www.omdbapi.com/?s=${encodeURI(this.state.searchQuery)}&page=${pageNumber}&apikey=${omdbKey}`);
        let pageResponse = await fetch(`http://www.omdbapi.com/?s=${encodeURI(this.state.searchQuery)}&page=${pageNumber}&apikey=${omdbKey}`)
        let pageBody = await pageResponse.json();
        allResults = allResults.concat(pageBody.Search);
        console.log(`is ${allResults.length} greater than ${body.totalResults}`)
        if (allResults.length >= +(body.totalResults)) break;
        pageNumber++;
      }
      this.setState({ items: allResults, loading: false, results: body.totalResults });
      }
    else {
      this.setState({ loading: false });
    }
  }
  
  handleNewSearch(value) {
    this.setState({ searchQuery: value }, () => {
      this.loadResource({ value });
    })
  }

  render() {
    const { items, loading, results} = this.state;
    const list = (
      <ul>
        {items.filter(item=>item).map((item, i, items)=> {
          return (
            <li key={i}>

              <a href={'http://www.imdb.com/title/' + item.imdbID}>{item.Title}</a>
            </li>
          )
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

        <form onSubmit={ event=> {
          event.preventDefault();
          return this.handleNewSearch(event.target.elements.textInput.value);
        }}>
          <input name="textInput" />
          <button type="submit">Search</button>
        </form>
        <h4>{results} Results</h4>
        {loading ? load : list}
        </section>
      </div>
    );
  }
}

export default App;
