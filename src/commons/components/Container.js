import React from 'react';

const Container = ({ children }) => {
  const containerStyle = {
    width: '1400px',
    margin: '50px auto',
    padding: '20px', 
    boxSizing: 'border-box',
  };

  return <div style={containerStyle}>{children}</div>;
};

export default Container;