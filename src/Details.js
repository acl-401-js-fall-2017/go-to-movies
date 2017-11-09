import React, { Component } from 'react';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY || '<enter Key here';

export default class Details extends Component {
  constructor(){
    super();
    this.state = {
      details: null,
    };
  }

  componentWillReceiveProps(nextProps){
    if(!nextProps.selectedId) return this.setState({ details: null });
    if(nextProps.selectedId === this.props.selectedId) return;
    this.doSearch(nextProps.selectedId);
  }

  async doSearch(id) {
    const url = encodeURI(`http://www.omdbapi.com/?i=${id}&apikey=${omdbKey}`);
    const response = await fetch(url);
    const body = await response.json();
    this.setState({ 
      details: body
    });
  }

  render(){
    const { details, dontDisplay } =this.state;
    if (!details) return (
      <div></div>
    ); 
    return(
      <div style={{ position: 'fixed', width: '20%', marginTop:'100px', marginLeft:'50px' }}>
        <li  style={{ marginBottom:5, listStyle:'none' }}>
          {details.Year}
        </li>
        <li style={{ marginBottom:5, listStyle:'none' }}>
          {details.Ratings.map((rating, i) => <li key={i}>{rating.Source} {rating.Value}</li>)}
        </li>
        <li style={{ marginBottom:5, listStyle:'none' }}>
          {details.Genre}
        </li>
        <li style={{ marginBottom:5, listStyle:'none' }}>
          {details.Year}
        </li>
        <li style={{ marginBottom:5, listStyle:'none' }}>
          {details.Plot}
        </li> 
      </div>
    );
  }

}