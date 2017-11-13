import React, { Component } from 'react';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {

  constructor() {
    super();
    this.state = {
      items: [],
      date: new Date(),
      search: 'Star Wars',
      loading: false
    };
  }
  

  handleFormSubmit(value) {
    this.setState({ search: value }, () => this.loadSearch(value));
  }

  componentDidMount() {
    this.loadSearch(this.state.search);
  }

  async loadSearch(search) {
    this.setState({ loading: true });
    const response = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=${omdbKey}`);
    const body = await response.json();
    this.setState({
      items: body.Search,
      loading: false
    });
  }
  
  changeSearch(search) {
    this.setState({ search }, () => {
      this.loadResource(search);
    });
  }
  
  
  render() {
    const { date, items, loading } = this.state;
      
    const list = (
      <div className="wrapper">
        {items.map(film => <div key={film.imdbID}>
          <figcaption>{film.Title}</figcaption>
          <figcaption>{film.Year}</figcaption>
          <img src={film.Poster} alt=''/></div>)}
      </div>
    );

    const load = <div>loading...</div>;

    return (
      <div className="App">
        <header className="App-header" date={this.state.date}>
          <h1 className="App-title">Welcome to the Movie Db</h1>
          <p>It is { date.toLocaleTimeString() }</p>
          <SearchTitle search={this.state.search}
            onFormSubmit={value => this.handleFormSubmit(value)}
          />  
        </header>
        {loading ? load : list}
      </div>
    ); 
  }
}

export default App;

class SearchTitle extends Component {
  render() {
    const { search, onFormSubmit } = this.props;

    return(
      <form onSubmit={(event) => {
        event.preventDefault();
        onFormSubmit(event.target.title.value);
        event.target.reset();
      }}>
        <label>Enter a movie title:&nbsp;&nbsp;
          <input name="title" type="text" autoComplete="off" defaultValue={search}/>
          <input className="enter" type="submit" value="Enter"/>
        </label><br/>
      </form>
    );
  }
}