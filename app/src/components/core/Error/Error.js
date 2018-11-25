import React from 'react';

const Error = ({ error }) => <p style={{ 'font-size': '14px', 'margin': '10px auto', 'color': 'red' }}>Error: {JSON.stringify(error, null, 2)}</p>;

export default Error;
