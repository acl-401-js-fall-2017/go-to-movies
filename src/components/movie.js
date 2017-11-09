import React, { Component } from 'react';
import FlipCard from 'react-flipcard-2';

class Movie extends Component {

  render() {
    const {
      Poster,
      Title,
      Year,
      imdbID
    } = this.props.movieProps;
    const imdbLink = `http://www.imdb.com/title/${imdbID}/`;
    return (
      <div
        className="Movie"
        style={{
          display: 'flex',
          height: '33em',
          margin: '1em',
          width: '20em'
        }}
      >

        <FlipCard>
          <div>
            <article 
              className="MovieFront"
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
            </article>
              
          </div>
          <div>
            <article 
              className="MovieFront"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                margin: '1em',
                height: '20em',
                width: '20em'
              }}
            >
              <h2
                style={{
      
                  textAlign: 'center'
                }}
              >
                {Title}
              </h2>
              <h3
                style={{
                    
                  textAlign: 'center'
                }}
              >
                {Year}
              </h3>
              <a href={imdbLink}>
                IMDB
              </a>
            </article>
          </div>
        </FlipCard>
      </div>
    );
  }
}

export default Movie;