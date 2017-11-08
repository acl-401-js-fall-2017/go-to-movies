import React, { Component } from 'react';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

export default class OmdbApp extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      resource: 'Alien',
      loading: false
    };
  }

  componentDidMount() {
    this.loadResource(this.state.resource);
  }

  async loadResource(resource) {
    this.setState({ loading: true });
    const response = await fetch(`http://www.omdbapi.com/?s=${resource}&apikey=${omdbKey}`);
    const body = await response.json();
    this.setState({
      items: body.Search,
      loading: false
    });
  }

  changeResource(resource) {
    this.setState({ resource }, () => {
      this.loadResource(resource);
    });
  }

  render() {
    const { resource, items, loading } = this.state;
    const choice = ['Alien','Title', 'Year'];

    const list = (
      <ul>
        {items.map(item => <li key={item.imdbID}>{item.Title}</li>)}
      </ul>
    );

    const load = <div>Loading...</div>;

    return (
      <section>
        {choice.map(choice => {
          return <button key={choice} disabled={choice === resource}
            onClick={() => this.changeResource(choice)}
          >
            {choice}
          </button>;
        })}
        <div>{items.length} {resource}</div>
        {loading ? load : list}
      </section>
    );
  }
}