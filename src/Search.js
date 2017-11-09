import React, { Component } from 'react';

class Search extends Component {
  render() {
    const { search, onSearchSubmit } = this.props;

    return (
      <div className="search">
        <form onSubmit={onSearchSubmit}>
          <input name='search' defaultValue={search}/>
          <input type="submit" value="search movies"/>
        </form> 
      </div>
    );
  }
}

export default Search;