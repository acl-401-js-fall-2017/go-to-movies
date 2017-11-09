import React, { Component } from 'react';
import MovieList from './components/movieList';
import SearchBox from './components/searchBox';
import Gradient from './components/gradients';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search: {
        title: 'star wars',
        type: 'all',
        page: 1
      },
      loading: false,
      noResults: false,
      movies: []
    };
  }

  handleSearchChange(search) {
    this.setState({ search: search });
  }
  
  handleNewInput(search) {
    this.setState({ search: search });
    this.getMovs(search);  
  }

  async getMovs(search) {
    this.setState({ loading: true });
    const typeSearch = search.type === 'all' ? '' : `&type=${search.type}` ;
    const response = await fetch(`http://www.omdbapi.com/?s=${search.title}${typeSearch}&page=${search.page}&apikey=3db77742`);
    const body = await response.json();
    if(body.Response === 'True') this.setState({ 
      movies: body.Search,
      loading: false,
      noResults: false
    });
    else this.setState({ 
      loading: false,
      noResults: true
    });
  }

  componentDidMount() {
    this.getMovs(this.state.search);
  }

  render() {
    const {
      search,
      loading,
      noResults,
      movies
    } = this.state;

    return (
      <div className="App">
        <SearchBox
          search={search}
          onSearchTitleChange={
            title => {
              search.title = title.value;
              this.handleSearchChange(search);
            }
          }
          onSearchTitleEnter={
            title => {
              search.title = title.value;
              this.handleNewInput(search);
            }
          }
          onSearchTypeChange={
            type => {
              search.type = type;
              this.handleNewInput(search);
            }
          }
          onSearchPageChange={
            page => {
              search.page = parseInt(page, 10);
              this.handleNewInput(search);
            }
          }
        />
        <MovieList
          loading={loading}
          noResults={noResults}
          movies={movies}
        />
        <div
          style={{
            backgroundColor: 'black',
            padding: '2em 0'
          }}
        >
          <Gradient/>
        </div>
      </div>
    );
  }
}

export default App;

