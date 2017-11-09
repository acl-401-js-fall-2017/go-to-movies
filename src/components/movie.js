import React, { Component } from 'react';

class Movie extends Component {
  render() {
    const {
      Poster,
      // Type,
      Title,
      Year,
      imdbID
    } = this.props.movieProps;
    const imdbLink = `http://www.imdb.com/title/${imdbID}/`;
    return (
      <article 
        className="Movie"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          margin: '1em',
          width: '20em'
        }}
      >
        <img 
          src={Poster !== 'N/A' ? Poster : 'http://www.lacinefest.org/uploads/2/6/7/4/26743637/no-poster_orig.jpeg'}
          alt={Title}
          style={{
            height: '30em',
            width: '20em'
          }}
        />
        <a href={imdbLink}>
          <p
            style={{
 
              textAlign: 'center'
            }}
          >
            {Title}
          </p>
          <p
            style={{
              
              textAlign: 'center'
            }}
          >
            {Year}
          </p>
        </a>
      </article>
    );
  }
}

export default Movie;