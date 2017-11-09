import React, { Component } from 'react';

class MovieList extends Component {
  render() {
    const { items, loading, onDetails } = this.props;
    const noImageSrc = 'http://epaper.gujaratimidday.com/images/no_image_thumb.gif';
    const list = (
      <div className='flexBox'>
        {items.map(item => <div className='flexItem' key={item.imdbID}>
          <h3> {item.Title} </h3>
          <h4>Released: {item.Year} </h4>
          <img src={item.Poster === 'N/A' ? noImageSrc : item.Poster} alt='movie poster' id={item.Title}
            onClick={onDetails}/>
        </div>)}
      </div>
    );
    console.log('???', items);

    const load = <div>Loading...</div>;
    return (
      <div>
        {loading ? load : list}
      </div>
    );
  }
}

export default MovieList;