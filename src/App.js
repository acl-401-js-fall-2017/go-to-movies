// console log the values to see what I am passing and getting
//give an if else for getting a null response to array.map to
import React, { Component } from 'react';
import Header from './Header';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      items: [],
      resource: 'movie',
      loading: false
    };
  }



  //like an onload function in react
  componentDidMount(){
    this.loadResource(this.state.resource);
  }
  
  async loadResource (filter) {
    this.setState({ loading: true });
    const response = await fetch(`http://www.omdbapi.com/?s=${filter}&plot=short&r=json&apikey=${omdbKey}`);
    const body = await response.json();
    this.setState({
      items: body.Search ||[],
      loading: false
    });
  }
  
  changeResource(change) {
    this.setState({ resource: change }, () => {
      return this.loadResource(change);
    });
  }
  
  render() {
    const { filter, loading, items } = this.state;
    const choices = ['Movie', 'Year', 'Goonies'];

    const list = (
      <ul>
        {items.map(item => <li key={item.imdbID}>{item.Title}</li>)}
      </ul>
    );
    
    const load = <div> Loading... </div>;
    
    return (
      <section>
        <Header filter={filter} onResourceChange={filter => {
          this.setState({ filter });
          this.setState({ resource: filter }, () => {
            return this.loadResource(filter);
          });
        }}/>
        {choices.map(choice => {
          return <button key={choice} disabled={choice === filter}
            onClick={() => this.changeResource(choice)}
          >
            {choice}
          </button>;
        })}
        <div>{items.length} {filter}</div>
        {loading ? load : list}
      </section>
    );
  }
}
