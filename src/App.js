import React, { Component } from 'react';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

export default class movieApp extends Component {
  
  constructor() {
    super();
    this.state = {
      movies: [],
      resource: 'title',
      loading: false
    };
  }
  
  componentDidMount () {
    this.loadResource(this.state.resource);
  }

  async loadResource(resource) {
    this.setState({ loading: true });
    const response = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t=${resource}`);
    const body = await response.json();
    this.setState({
      movies: body.results,
      loading: false
    });
  }

  render() {
    const { movies, resource, loading } = this.state;

    const list = (
      <ul>
        {movies.map(movie => <li key={movie.name}>{movie.name}</li>)}
      </ul>
    );

    const load = <div>Loading...</div>;
    
    return (
      <section>
        {loading ? load : list}
      </section>
    );
  }
}
