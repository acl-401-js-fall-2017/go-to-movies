import React, { Component } from 'react';
import FlipCard from 'react-flipcard-2';

class Movie extends Component {

  constructor() {
    super();
    this.state={
      id: '',
      details: {},
      needsDetails: true,
      loading: false
    };
  }

  async getDetails() {
    this.setState({ loading: true });
    const response = await fetch(`http://www.omdbapi.com/?i=${this.state.id}&r=json&apikey=3db77742`);
    const body = await response.json();
    this.setState({ 
      details: body,
      loading: false,
      needsDetails: false
    });
  }

  handleHover(mov) {
    if(mov.state.needsDetails) mov.getDetails();
  }

  componentDidMount() {
    this.setState({ id: this.props.movieProps.imdbID });
  }

  render() {
    const { details } = this.state;
    const {
      Poster,
      Title,
      imdbID
    } = this.props.movieProps;
    const imdbLink = `http://www.imdb.com/title/${imdbID}/`;
    return (
      <div
        className="Movie"
        style={{
          display: 'flex',
          height: '33em',
          margin: '0.5em',
          width: '20em',
        }}
        onMouseOver={() => this.handleHover(this)}
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
                height: '30em',
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
                padding: '1.5em',
                paddingBottom: '2em',
                height: '26.5em',
                width: '17em',
                textAlign: 'center',
                backgroundColor: 'rgb(230, 230, 230)',
                
              }}
            >
              <h3 style={{ 
                margin: '0 auto',
                backgroundColor: 'rgb(245, 245, 245)', 
                padding: '0.5em' 
              }}>{Title}</h3>
              <p>Released: {details.Released}</p>
              <p>Rated: {details.Rated}</p>
              <p>Director: {details.Director}</p>
              <p>Genre: {details.Genre}</p>
              <p>Metascore: {details.Metascore}</p>
              <p>IMDB Rating: {details.imdbRating}</p>
              <a href={imdbLink} tabIndex="-1">IMDB</a>
            </article>
          </div>
        </FlipCard>
      </div>
    );
  }
}

export default Movie;