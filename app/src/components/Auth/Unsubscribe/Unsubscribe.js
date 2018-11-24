import React, { Component } from 'react';
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

class UnsubscribeEmail extends Component {
    componentDidMount() {
        this.props.mutate();
    }

    render() {
        const { classes, user } = this.props;

        if (!user || user.subscribe) {
            return null;
        }

        return (
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    <p>{user.email} was unsubscribed</p>
                </Typography>
            </Paper>
        )
    }
}

export default withStyles(styles)(UnsubscribeEmail);
