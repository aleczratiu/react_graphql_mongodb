import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types'
import EVD from './EventDisplay';

const GET_EVENT_BY_ID = gql`
    query getEventById(
    $id: String!,
    ) {
    getEventById (
        id: $id
    ) {
        id,
        image,
        description,
        createdAt,
        updatedAt
        questions
    }
}
`;

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

const EventDisplay = ({ match, classes }) => (
    <Query query={GET_EVENT_BY_ID} variables={{ id: match.params.id }}>
        {({ error, loading, data }) => {
            localStorage.setItem('EVENT', match.url);
            if (loading) return <CircularProgress className={classes.progress} />;
            if (error) console.log('Error:', error);
            return <EVD data={data} />;
        }}
    </Query>
);

EventDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDisplay);
