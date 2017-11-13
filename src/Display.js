import React, { Component } from 'react';

class Display extends Component {
  render() {
    const { items, results, loading } = this.props;
  
    const load = <div>Loading...</div>;
      
    const list = (
      <ul>
        {items.filter(item=>item).map((item, i, items)=> {
          return (
            <li key={i}>
              <a href={'http://www.imdb.com/title/' + item.imdbID}>{item.Title}</a>
            </li>
          );
        })}  
      </ul>
    );
  
    return (
      <div>
        <section className="centered">
          <p>{results} Results</p>
        </section>
        
        <section className="centered">
          {loading ? load : list}
        </section>
      </div>
    );
  }
}

export default Display;