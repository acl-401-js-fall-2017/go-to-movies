import React, { Component } from 'react';

class Colors extends Component {
  render() {
    const { colors, baseColor } = this.props;
    return (
      <div 
        className="Colors"
        style={{ 
          margin: '5%',
          width: '60%',
          backgroundColor: baseColor,
          borderRadius: '50%',
          overflow: 'hidden'
        }}
      >
        {colors.map((color, i) => {
          return (
            <div 
              key={i}
              className="Color" 
              style={{ 
                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                height: '1px'
              }}
            ></div>
          );
        })}
      </div>
    );
  }
}

export default Colors;