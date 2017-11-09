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

      this.setState({ items: allResults, loading: false, results: allResults.length });
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
    const { items, loading, results } = this.state;

    return (
      <div>
        <header className="App-header">
          <h1 className="App-title">MovieSearch.org</h1>
        </header>

        <Input newSearch={value => this.handleNewSearch(value)}/>

        <Display results={results} loading={loading} items={items} />

      </div>
    );
  }
}

class Display extends Component {
  render() {
    const { items, results, loading } = this.props;

    const load = <div>Loading...</div>;
    
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

    return (
      <div>
      <section className="centered">
      <p>{results} Results</p>
      </section>
      
      <section className="centered">
      {loading ? load : list}
      </section>
      </div>
    );
  }
}

class Input extends Component {
  render(){
    const { newSearch } = this.props;
    return (
      <section className="centered">
      <form onSubmit={ event=> {
        event.preventDefault();
        return newSearch(event.target.elements.textInput.value);
      }}>
        <input name="textInput" />
        <button type="submit">Search</button>
      </form>
      </section>
    );
  };
}


export default App;
