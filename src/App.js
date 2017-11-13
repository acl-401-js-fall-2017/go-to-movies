import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieApp from './MovieApp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Reel Me!</h1>
        </header>
        <article className="App-intro">
          <MovieApp />
        </article>
      </div>
    );
  }
}

export default App;
