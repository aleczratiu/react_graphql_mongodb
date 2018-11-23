import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

const AddButton = ({ classes }) => (
    <Button variant="fab" color="primary" aria-label="Add" className={classes.button}>
        <AddIcon />
    </Button>
);

AddButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddButton);
