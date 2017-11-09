import React, { Component } from 'react';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

export default class OmdbApp extends Component {
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
    const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${omdbKey}`);
    const body = await response.json();
    const items = body.Response === 'True' ? body.Search : [];
    this.setState({
      items,
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
      <section>
        {items.map(item => <div key={item.imdbID}>
          <h2> {item.Title} </h2>
          <h3> Released: {item.Year} </h3>
          <img src={item.Poster} alt='Movie Poster' />
        </div>)}
      </section>
    );

    const load = <div>Loading...</div>;

    return (
      <section>
        <label> Search : <input name='query' value={query}
          onChange={({ target }) => this.changeResource(target.value)}/>
        </label>
        
        {<div>{items.length} {query}</div>}
        {loading ? load : list}
      </section>
    );
  }
}