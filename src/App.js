import React, { Component } from 'react';
import logo from './logo.svg';
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
      items: body.results,
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
    const { resource } = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Search resource={resource}/>
      </div>
    );
  }
}

class Search extends Component {
  render(){
    //const {} = this.props;
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
