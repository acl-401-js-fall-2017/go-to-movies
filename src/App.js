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
      items: body.Search || [], //if null then empty array
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
    const list = (
      <ul style={{ listStyle: 'none', display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'center', padding:'0' }}>
        {items.map(item => 
          <li 
            key={item.imdbID}
            style={{ padding:'2em' }}
          >
            <article><h3>{item.Title}</h3><img src={item.Poster === 'N/A' ? 'http://www.gstatic.com/tv/thumb/movieposters/8880256/p8880256_p_v8_ab.jpg' : item.Poster} alt={item.imdbID} /> 
            </article>
          </li>
        )}
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
        <div>Showing the first {items.length} {filter} movies</div>
        {loading ? load : list}
        <div>{items.Poster} {filter}</div>
      </section>
    );
  }
}
