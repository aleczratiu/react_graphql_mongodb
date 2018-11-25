import React from 'react';

const Error = ({ error }) => <p style={{ 'font-size': '16px', 'margin': '39px', 'color': 'red' }}>Error: {JSON.stringify(error, null, 2)}</p>;

export default Error;
