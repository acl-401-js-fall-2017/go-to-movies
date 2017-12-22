import React, { Component } from 'react';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      query: '',
      loading: false
    };
  }
  
  componentDidMount() {
    this.loadMovies(this.state.query);
  }

  async loadMovies(query) {
    this.setState({ loading: true });
    const response = await fetch(`https://www.omdbapi.com/?s=${encodeURI(query)}&apikey=${omdbKey}`);
    const body = await response.json();
    this.setState({
      movies: body.Response === 'True' ? body.Search : [],
      loading: false
    });
  }

  changeResource(query) {
    this.setState({ query }, () => {
      this.loadMovies(query);
    });
  }

  render() {
    const { query, movies, loading } = this.state;

    const list = (
      <section className="wrapper">
        {movies.map(movie => 
          <div className="tile" key={movie.imdbID}>
            <p className="title">
              <a href={'http://www.imdb.com/title/' + movie.imdbID}>{movie.Title}</a>
            </p>
            <p className="subtitle">
              <i>{movie.Year}</i>
            </p>
            <figure className="image is 4by3">
              <img src={movie.Poster} alt='Movie Poster Not Found' />
            </figure>
          </div>)
        }
      </section>
    );

    const load = <div>Loading...</div>;
    
    return (
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-family-primary">
              Film Finder
              </h1>
              <h2 className="subtitle">
              An OMBD based search
              </h2>
            </div>
          </div>
        </section>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <p className="subtitle is-5">
                <strong>{movies.length}</strong> movies
              </p>
            </div>
            <div className="level-item">
              <div className="field has-addons">
                <p className="control">
                  <input className="input" name="query" type="text" value={query} placeholder="Find a movie" onChange={({ target }) => this.changeResource(target.value)}/>
                </p>
                <p className="control">
                  <button className="button">
                    Search
                  </button>
                </p>
              </div>
            </div>
          </div>
        </nav>
        <div className="tile is-ancestor"> 
          <div className="tile is-parent"> 
            {loading ? load : list}
          </div>
        </div>
      </div>
    );
  }
}