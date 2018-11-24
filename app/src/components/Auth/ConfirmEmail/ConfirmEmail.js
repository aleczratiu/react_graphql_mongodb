import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

const ConfirmEmail = ({ confirmEmail, classes }) => {
    if (!confirmEmail) {
        return null;
    }

    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    {confirmEmail.confirmEmail.email} was confirmed
                </Typography>
            </Paper>
        </div>
    )
}

export default withStyles(styles)(ConfirmEmail);
