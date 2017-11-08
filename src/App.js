import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {

  constructor(){
    super();
    this.state = {
      items: [],
      resource: 'people',
      loading: false
    };
  }

  componentDidMount(){
    this.loadResource(this.state.resource);
  }

  async loadResource(resource){
    this.setState({ loading: true });
    const response = await fetch();
    const body = await response.json();
    this.setState({
      items: body.results,
      loading: false
    });
  }
   
  changeResource(resource){
    this.setState({ resource }, () => {
      this.loadResource(resource);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
