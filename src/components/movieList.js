import React, { Component } from 'react';
import Movie from './movie';

class MovieList extends Component {
  render() {
    const {
      loading,
      noResults,
      movies
    } = this.props;

    let searchResults = null;
    if(!noResults) searchResults = movies.map((movieProps, i) => {
      return (
        <Movie
          key={i}
          movieProps={movieProps}
        />
      );
    });
    else searchResults = noResultsMessage;


    return (
      <div 
        className="searchResults"
        style={{
          margin: 'auto 5em',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap'
        }}
      >
        {loading ? loader : searchResults}
      </div>
    );
  }
}

const loader = (
  <div className="loader">
    loading...
  </div>
);

const noResultsMessage = (
  <div className="resultsless">
    <img
      src="http://www.lansky.cc/nothing.jpg"
      alt="Nothing to see here."
      style={{
        height: '70%'
      }}
    />
  </div>
);

export default MovieList;