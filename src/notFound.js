import styled from 'styled-components'; 
import React, { Component } from 'react';
export default class NotFound extends Component {
  render() {
    return (
      <DisplayFlex shouldDisplay={this.props.isNotFound}>
        <div style={{ display:'flex', justifyContent:'center' }}>
          <Pug alt={''}
            src="https://static1.squarespace.com/static/594974c0e58c62484cbd42f9/t/594986a45a730f2283302fc9/1497992070607/img_2835.jpg"
          />
        </div>
        <h1 className="App-title">No results were found to match the search</h1>
      </DisplayFlex>
    );
  }
}

const DisplayFlex = styled.div`
display: ${props => props.shouldDisplay ? 'flex' : 'none'};
flex-direction: column;
`;

const Pug = styled.img`
width:80%;
height:400px;
`;