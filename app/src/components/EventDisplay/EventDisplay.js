import React from 'react';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EventNotFound from 'Components/core/EventNotFound';
import { getSessionToken } from 'Utils/auth';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

const loggedUser = getSessionToken();

const EventDisplay = ({ data }) => {
    if (!loggedUser) {
        return <Redirect to="/register" />
    }
    if (!data.getEventById) return <EventNotFound />;

    return (
        <div>
            <ExpansionPanel >
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    {/* <Typography>{data}</Typography> */}
                </ExpansionPanelSummary>
                {data.questions && data.questions.map((question, index) =>
                    (
                        <ExpansionPanelDetails key={index}>
                            <Typography>
                                {question}
                            </Typography>
                        </ExpansionPanelDetails>

                    )
                )}
            </ExpansionPanel>
        </div>
    )
}

export default withStyles(styles)(EventDisplay);
