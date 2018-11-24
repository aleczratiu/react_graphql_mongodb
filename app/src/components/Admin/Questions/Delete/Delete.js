import PropTypes from 'prop-types';
import React from 'react';
import Button from '@material-ui/core/Button';

const Delete = ({ onClick }) => (
    <Button onClick={onClick}>
        Delete
    </Button>
);

Delete.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Delete;
