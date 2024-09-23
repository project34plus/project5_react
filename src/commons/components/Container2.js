import React from 'react';

const Container2 = ({ children }) => {
  const containerStyle = {
    width: '1200px',
    minHeight: '600px',
    margin: '50px auto',
    padding: '20px',
    boxSizing: 'border-box',
  };

  return <div style={containerStyle}>{children}</div>;
};

export default React.memo(Container2);
