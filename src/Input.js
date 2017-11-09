import React, { Component } from 'react';

class Input extends Component {
    render(){
      const { newSearch } = this.props;
      return (
        <section className="centered">
        <form onSubmit={ event=> {
          event.preventDefault();
          return newSearch(event.target.elements.textInput.value);
        }}>
          <input name="textInput" />
          <button type="submit">Search</button>
        </form>
        </section>
      );
    };
  }

export default Input;