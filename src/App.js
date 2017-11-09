import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  constructor(){
    super();
    this.state = {
      items: [],
      resource: 'Star Wars',
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.loadResource(this.state.resource);
  }

  async loadResource(resource){
    this.setState({ loading: true });
    const url = `http://www.omdbapi.com/?s=${resource}&plot=short&r=json&apikey=${omdbKey}`;
    const response = await fetch(url);
    const body = await response.json();
    let searchResult;
    body.Error ? searchResult = [] : searchResult = body.Search;
    this.setState({
      items: searchResult,
      loading: false
    });
  }
   
  
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ resource: this.element.value }, () => {
      this.loadResource(this.element.value);
    });
  }

  render() {
    const { items, resource, loading } = this.state;

    const list = (
      <ul>
        {
          items.map((item, i) => { 
            if(item.Poster !== 'N/A'){
              return (
                <li key={i} className="Film">
                  <figcaption>{item.Title}</figcaption>
                  <figcaption>Year:{item.Year}</figcaption>
                  <img src={item.Poster} className="Poster" alt={item.Title}></img>
                </li>
              );
            } else {
              return(
                <li key={i}>{item.Title}</li>
              );
            }
          })
        }
      </ul>
    );

    const load =  <div className="loader"></div> ;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input className="Search" type="text" ref={el => this.element = el} />
          </label>
          <input className="Submit" type="submit" value="Submit" />
        </form>
        <div className="Result">{items.length} results for {resource}</div>
        {loading ? load : list}
      </div>
    );
  }
}



export default App;
