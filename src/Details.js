import React, { Component } from 'react';
import styled from 'styled-components';

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
    const { details } =this.state;
    if (!details) return (
      <div></div>
    ); 
    return(
      <div style={{ position: 'fixed', width: '20%', marginTop:'30px', marginLeft:'50px' }}>
        <DetailsList>
          <a href={`https://www.imdb.com/title/${details.imdbID}`}>
            <p className='Movie-title'>{details.Title}  ({details.Year})</p>
          </a>
        </DetailsList>

        <DetailsList>
          {details.Genre}
        </DetailsList>

        <DetailsList>
          {details.Plot}
        </DetailsList> 

        <DetailsList>
          {details.Ratings.map((rating, i) => <li key={i}>{rating.Source} {rating.Value}</li>)}
        </DetailsList>
      </div>
    );
  }

}

const DetailsList =styled.li`
  margin-bottom: 5px;
  list-style: none;
`;

