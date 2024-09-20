import React from 'react';

const LoginBox = ({ children }) => {
  const containerStyle = {
    width: '700px',
    margin: 'auto',
    padding: '20px',
    boxSizing: 'border-box',
  };

  return <div style={containerStyle}>{children}</div>;
};

export default React.memo(LoginBox);
