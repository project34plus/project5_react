import React from 'react';

const JoinBox = ({ children }) => {
  const containerStyle = {
    width: '900px',
    margin: 'auto',
    padding: '20px',
    boxSizing: 'border-box',
  };

  return <div style={containerStyle}>{children}</div>;
};

export default React.memo(JoinBox);
