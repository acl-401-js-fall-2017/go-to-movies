import React, { Component } from 'react';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        {/* <MovieList /> */}
      </div>
    );
  }
}

class SearchBar extends Component {
  render() {
    return (
      <form className="SearchBar">
        <label>
          Title:
          <textarea />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}