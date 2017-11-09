import React, { Component } from 'react';
import ColorDials from './colorDials';
import { ChromePicker } from 'react-color';

class ColorController extends Component {
  render() {

    const {
      controls,
      onChangeFuncs
    } = this.props;
    const change = onChangeFuncs;

    const {
      rSettings,
      gSettings,
      bSettings,
      aSettings: a
    } = controls;

    return(
      <div
        className="colorController"
        style={{
          color: 'white',
          width: '10em',
          margin: '3em',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around'
        }}
      >
        <ColorDials
          color='red'
          colorSet={rSettings}
          change={onChangeFuncs}
        />
        <ColorDials
          color='green'
          colorSet={gSettings}
          change={onChangeFuncs}
        />
        <ColorDials
          color='blue'
          colorSet={bSettings}
          change={onChangeFuncs}
        />
        <div 
          className="alpha"
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
            Alpha
          </h3>
          <label>intensity
            <input 
              value={a.intensity * 100}
              type="range"
              min="0"
              max="100"
              onChange={({ target }) => change.alpha.intensity(target)}
            />
          </label>
          <label>spread
            <input 
              value={a.spread * 100}
              type="range"
              min="0"
              max="200"
              onChange={({ target }) => change.alpha.spread(target)}
            />
          </label>
          <label>offset
            <input 
              value={a.offset}
              type="range"
              min="-2"
              max="2"
              step="0.1"
              onChange={({ target }) => change.alpha.offset(target)}
            />
          </label>
        </div>
        <div 
          className="base"
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
              marginBottom: '0',
              color: controls.bColor
            }}
          >
            Base Color
          </h3>
          <ChromePicker
            color={controls.bColor}
            onChange={({ target }) => change.color(target)}
            onChangeComplete={({ hex }) => change.color(hex)}
          />
        </div>
      </div>
    );
  }
}

export default ColorController;