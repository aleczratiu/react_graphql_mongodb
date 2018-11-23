import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    root: {
        width: '100%',
    },
});

const List = ({ classes, events }) => {
    if (!events || !events.length) return null;
    return (
        <div className={classes.root}>
            {events.map((event) => (
                <ExpansionPanel key={event.id}>
                    <ExpansionPanelSummary>
                        <Typography className={classes.heading}>{event.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>{event.description}</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    );
};

List.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(List);
