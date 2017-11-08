import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  constructor(){
    super();
    this.state = {
      items: [],
      resource: 'Star%20Wars',
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
    console.log('url: ',url);
    console.log('body: ',body);
    this.setState({
      items: body,
      loading: false
    });
  }
   
  changeResource(resource){
    this.setState({ resource }, () => {
      this.loadResource(resource);
    });
  }

  handleSubmit(event) {
    console.log('handling submit');
    event.preventDefault();
    this.setState({ resource: this.element.value }, () => {
      console.log(' changing resource to : ', this.element.value);
      console.log(' new resource value :', this.state.resource);
      this.loadResource(this.element.value);
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" ref={el => this.element = el} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}


export default App;
