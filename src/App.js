import React, { Component } from 'react';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  constructor(){
    super();
    this.state = {
      items: [],
      resource: 'Star Wars',
      loading: false,
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
    let body = await response.json();
    body.Error ? body = [] : body = body.Search;
    this.setState({
      items: body,
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
    return (
      <div>
        <Search handleSubmit={this.handleSubmit} app={this} />
        <Movies items={items} loading={loading} resource={resource}/>
      </div>
    );
  }
}

class Search extends Component{
  render(){
    const { handleSubmit, app } = this.props;
    return(
      <form onSubmit={handleSubmit}>
        <label>
          <input className="Search" type="text" ref={el => app.element = el} />
        </label>
        <input className="Submit" type="submit" value="Submit" />
      </form>
    );
  }
}

class Movies extends Component{
  render(){
    const { items, loading, resource } =  this.props;
    const load =  <div className="loader"></div> ;
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
    return(
      <div>
        <div className="Result">{items.length} results for {resource}</div>
        {loading ? load : list}
      </div>
    );
  }
}

export default App;
