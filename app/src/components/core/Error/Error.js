import React from 'react';

const Error = ({ error }) => <p>Error: {JSON.stringify(error, null, 2)}</p>;

export default Error;
