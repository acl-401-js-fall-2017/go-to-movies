import React, { Component } from 'react';
import Colors from './colors';
import ColorController from './colorController';

class Gradient extends Component {
  constructor() {
    super();
    this.state = {
      colors: [],
      controls: {
        rSettings: {
          intensity: 1,
          spread: 0.290888,
          offset: 1
        },
        gSettings: {
          intensity: 1,
          spread: 0.1745,
          offset: 11.14
        },
        bSettings: {
          intensity: 1,
          spread: 0.3723,
          offset: 0.5
        },
        aSettings: {
          intensity: 1,
          spread: 1,
          offset: 1
        },
        bColor: '#ffffff'
      }
    };
  }

  calcColorIntensity = (c, i) => Math.floor(c.intensity * (Math.cos((i / c.spread / 1080 + c.offset) * Math.PI) + 1) * 255 / 2);
  calcFadeIntensity = (a, i) => a.intensity * (Math.cos((i / a.spread / 1080 + a.offset) * Math.PI) + 1) / 2;
  
  generateGradient() {
    const colors = [];
    const { rSettings, gSettings, bSettings, aSettings } = this.state.controls;
    for(let i = 0; i < 1080; i++) {
      colors.push({
        r: this.calcColorIntensity(rSettings, i),
        g: this.calcColorIntensity(gSettings, i),
        b: this.calcColorIntensity(bSettings, i),
        a: this.calcFadeIntensity(aSettings, i)
      });
    }
    this.setState({ colors: colors });
  }

  componentDidMount() {
    this.generateGradient();
  }

  render() {
    const { colors, controls } = this.state;

    
    const onChangeFuncs = {
      red: {
        intensity: ({ value }) => {
          controls.rSettings.intensity = value / 100;
          this.generateGradient();
        },
        spread: ({ value }) => {
          controls.rSettings.spread = value / 100;
          this.generateGradient();
        },
        offset: ({ value }) => {
          controls.rSettings.offset = parseFloat(value, 10);
          this.generateGradient();
        }
      },
      green: {
        intensity: ({ value }) => {
          controls.gSettings.intensity = value / 100;
          this.generateGradient();
        },
        spread: ({ value }) => {
          controls.gSettings.spread = value / 100;
          this.generateGradient();
        },
        offset: ({ value }) => {
          controls.gSettings.offset = parseFloat(value, 10);
          this.generateGradient();
        }
      },
      blue: {
        intensity: ({ value }) => {
          controls.bSettings.intensity = value / 100;
          this.generateGradient();
        },
        spread: ({ value }) => {
          controls.bSettings.spread = value / 100;
          this.generateGradient();
        },
        offset: ({ value }) => {
          controls.bSettings.offset = parseFloat(value, 10);
          this.generateGradient();
        }
      },
      alpha: {
        intensity: ({ value }) => {
          controls.aSettings.intensity = value / 100;
          this.generateGradient();
        },
        spread: ({ value }) => {
          controls.aSettings.spread = value / 100;
          this.generateGradient();
        },
        offset: ({ value }) => {
          controls.aSettings.offset = parseFloat(value, 10);
          this.generateGradient();
        }
      },
      color: value => {
        controls.bColor = value;
        this.generateGradient();
      }
    };

    return (
      <div 
        className="Gradient"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'black'
        }}
      >
        <Colors 
          colors={colors}
          baseColor={controls.bColor}
        />
        <ColorController
          controls={controls}
          onChangeFuncs={onChangeFuncs}
        />
      </div>
    );
  }
}


export default Gradient;
