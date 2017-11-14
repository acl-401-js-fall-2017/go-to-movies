import React, { Component } from 'react';

class Details extends Component {
  render() {
    const { details, onGoBack } = this.props;
    return(
      <div className="flex">
        <div className="flexBox">
          <img src={details&&details.Poster} alt="Poster"/>
        </div>
        <div className="flexList">
          <h3>{details&&details.Title}</h3>
          <ul>
            <li><span>Year</span>: {details&&details.Year}</li>
            <li><span>Rated</span>: {details&&details.Rated}</li>
            <li><span>Released</span>: {details&&details.Released}</li>
            <li><span>Runtime</span>: {details&&details.Runtime}</li>
            <li><span>Actors</span>: {details&&details.Actors}</li>
            <li><span>Awards</span>: {details&&details.Awards}</li>
            <li><span>Director</span>: {details&&details.Director}</li>
            <li><span>Production</span>: {details&&details.Production}</li>
            <li><span>Writer</span>: {details&&details.Writer}</li>
            <li><span>Imdb Rating</span>: {details&&details.imdbRating}</li>
            <li><span>Imdb Votes</span>: {details&&details.imdbVotes}</li>
          </ul>
          <button type="button" onClick={onGoBack} >Go Back!</button>
        </div>
      </div>
    );
  } 
}

export default Details;