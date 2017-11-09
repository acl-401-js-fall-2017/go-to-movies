import React, { Component } from 'react';

class Movie extends Component {
  render() {
    const {
      // Poster,
      // Type,
      Title,
      Year,
      imdbID
    } = this.props.movieProps;
    const imdbLink = `http://www.imdb.com/title/${imdbID}/`;
    return (
      <div 
        className="Movie"
        style={{
          width: '80%',
          margin: 'auto',
          minWidth: '30em',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <p
          style={{
            marginRight: '3em',
            width: '10em',
            textAlign: 'left'
          }}
        >
          {Year}
        </p>
        <p
          style={{
            marginRight: '3em',
            width: '20em',
            textAlign: 'left'
          }}
        >
          {Title}
        </p>
        <a href={imdbLink}><p>{imdbLink}</p></a>
      </div>
    );
  }
}

export default Movie;