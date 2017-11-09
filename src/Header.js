import React, { Component } from 'react';
import styles from './App.css';


export default class Header extends Component {
  render() {
    const { onResourceChange } = this.props;
    return (
      <header className={styles.AppHeader}>
        <h1>Search for a movie!</h1>
        <form onSubmit={event => {
          event.preventDefault();
          onResourceChange(event.target.elements.filter.value);
        }}>
          <input name="filter" />
          <button type="submit">Search</button>
        </form>
      </header>
    );
  }
}
