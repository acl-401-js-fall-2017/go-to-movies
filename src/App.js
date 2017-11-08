import React, { Component } from 'react';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;
// let resource = null;
// let items = null;

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      items: [],
      resource: 'Title',
      loading: false
    };
  }



  //   //like an onload function in react
  componetDidMount(){
    this.loadResource(this.state.resource);
  }

  async loadResource (resource) {
    this.setState({ loading: true });
    const response = await fetch(`http://www.omdbapi.com/?s=Star%20Wars&plot=short&r=json&apikey=${omdbKey}`);
    const body = await response.json();
    this.setState({
      items: body.results,
      loading: false
    });
  }

  render() {
    const { resource, loading, items } = this.state;
    const choices = ['Title'];

    const list = (
      <ul>
        {items.map(item => <li key={item.name}>{item.name}</li>)}
      </ul>
    );

    return (
      <div className="App">
        {choices.map(choice => {
          return <button key={choice} disabled={choice === resource}
            onClick={() => this.changeResource(choice)}
          >
            {choice}
          </button>;
        })}
      </div>
    );
  }
}

