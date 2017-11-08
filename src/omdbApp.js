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
}