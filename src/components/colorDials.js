import React, { Component } from 'react';

class ColorDials extends Component {
  render() {

    const {
      color,
      colorSet,
      change
    } = this.props;

    return (
      <div 
        className="red"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '10em',
          textAlign: 'right'
        }}
      >
        <h3
          style={{
            textAlign: 'left',
            marginBottom: '0'
          }}
        >
          {color}
        </h3>
        <label>intensity&nbsp;&nbsp;
          <input 
            value={colorSet.intensity * 100}
            type="range"
            min="1"
            step="1"
            max="100"
            onChange={({ target }) => change[color].intensity(target)}
          />
        </label>
        <label>spread&nbsp;&nbsp;
          <input 
            value={colorSet.spread * 100}
            type="range"
            min="1"
            step="1"
            max="200"
            onChange={({ target }) => change[color].spread(target)}
          />
        </label>
        <label>offset&nbsp;&nbsp;
          <input 
            value={colorSet.offset}
            type="range"
            min="-2"
            max="2"
            step="0.1"
            onChange={({ target }) => change[color].offset(target)}
          />
        </label>
      </div>
    );
  }
}


export default ColorDials;