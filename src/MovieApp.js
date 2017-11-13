import React, { Component } from 'react';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

export default class MovieApp extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      query: '',
      loading: false
    };
  }

  componentDidMount() {
    this.loadQuery(this.state.query);
  }

  async loadQuery(query) {
    this.setState({ loading: true });
    const response = await fetch(`http://www.omdbapi.com/?s=${encodeURI(query)}&apikey=${omdbKey}`);
    const body = await response.json();

    // This will allow items to not turn up as undefined when the query does 
    // not match anything that is being returned from the api
    this.setState({
      items: body.Response === 'True' ? body.Search : [],
      loading: false
    });
  }

  changeResource(query) {
    this.setState({ query }, () => {
      this.loadQuery(query);
    });
  }

  render() {
    const { query, items, loading } = this.state;

    const list = (
      <section className="wrapper">
        {items.map(item => 
          <div key={item.imdbID}>
            <h2> {item.Title} </h2>
            <h3> Released: {item.Year} </h3>

            {/* This will reference imdb website, adds the imdbID that omdb sends back, 
              and uses the Title that omdb sends to display that as the link name */}
            <h4> IMDB Link: <a href={'http://www.imdb.com/title/' + item.imdbID}>{item.Title}</a> </h4>
            <img src={item.Poster} alt='Movie Poster Not Found' />
          </div>)
        }
      </section>
    );

    const load = <div>Loading...</div>;
    
    return (
      <section>
        <label> Search : <input name='query' value={query}
          onChange={({ target }) => this.changeResource(target.value)}/>
        </label>
        
        {!query ? <div>Enter a Movie to Search!</div> : null }
        {<div> Movies found: {items.length}</div>}
        {loading ? load : list}
      </section>
    );
  }
}