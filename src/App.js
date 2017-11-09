import React, { Component } from 'react';
import './App.css';


export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      movies: [],
      resource: 'title',
      loading: false
    };
  }
  
  // componentDidMount () {
  //   this.loadResource(this.state.resource);
  // }
  
  render() {
    const { input } = this.state;
    return (
      <div className="App">
        <p>hello</p>
        <searchBar input={input}/>
      </div>
    );
  }
}

class searchBar extends Component {
  constructor() {
    super();
    this.state = {
      input: 'Enter title here'
    };
  }
  
  render() {
    const { input } = this.state;
    return (
      <label className="search-bar">Title:
        <input type="search" value="{ input }" />>
        <button type="submit">Search</button>
      </label>
    );
  }
}

// class moviesList extends Component {
  //   render() {
    // const omdbKey = process.env.REACT_APP_OMDB_API_KEY;
    //     return (
      //       const { movies, resource, loading } = this.state;
      
      //           const list = (
//             <ul>
//               {movies.map(movie => <li key={movie.name}>{movie.name}</li>)}
//             </ul>
//           );
      
//           const load = <div>Loading...</div>;
          
//           return (
//             <section>
//               {loading ? load : list}
//             </section>
//           );
//     )
//   }
// }
