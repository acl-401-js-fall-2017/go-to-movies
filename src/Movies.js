import React, { Component } from 'react';

export default class Movies extends Component {
  render() {
    const { results, setSelectedId } =this.props;
    return(
      <div>
        {results.map((result, i) =>{
          return(
            <li key={i} style={{ marginBottom:15, listStyle:'none' }}>
              <img 
                alt={''}
                src={result.Poster}
                onClick= {() => setSelectedId(result.imdbID)}
              />
            </li>
          );
        })}
      </div>
    );
  }
}