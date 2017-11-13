import React, { Component } from 'react';

class Details extends Component {
  render() {
    const { details, onGoBack } = this.props;
    return(
      <div>
        <ul>
          <li>Title: {details&&details.Title}</li>
          <li>Year: {details&&details.Year}</li>
          <li>Rated: {details&&details.Rated}</li>
          <li>Released:  {details&&details.Released}</li>
          <li>Runtime: {details&&details.Runtime}</li>
          <li>Actors: {details&&details.Actors}</li>
          <li>Awards: {details&&details.Awards}</li>
          <li>Director: {details&&details.Director}</li>
          <li>Production:  {details&&details.Production}</li>
          <li>Writer: {details&&details.Writer}</li>
          <li>Imdb Rating: {details&&details.imdbRating}</li>
          <li>Imdb Votes: {details&&details.imdbVotes}</li>
        </ul>
        <button type="button" onClick={onGoBack} >Go Back!</button>
      </div>
    );
  } 
}

export default Details;