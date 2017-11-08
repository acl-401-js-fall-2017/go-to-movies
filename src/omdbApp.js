import React, { Component } from 'react';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

export default class omdbApp extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      resource: '',
      loading: false
    };
  }

  componentDidMount() {
    this.loadResource(this.state.resource);
  }

  async loadResource(resource) {
    this.setState({ loading: true });
    const response = await fetch(`http://www.omdbapi.com/?s=star+wars&apikey=${omdbKey}`);
    const body = await response.json();
    this.setState({
      items: body.results,
      loading: false
    });
  }

}