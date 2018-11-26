import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import Error from 'Components/core/Error';
import EVD from './EventDisplay';

const GET_EVENT_BY_ID = gql`
    query getEventById($id: String!) {
        getEventById(id: $id) {
            createdAt
            description
            id
            image
            name
            questions {
                content
                createdAt
                id
                updatedAt
            }
            updatedAt
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
            // if (loading) { console.log('loading', loading); return null }
            // if (error) return <Error error={error} />;
            return <EVD event={data.getEventById} />;
        }}
    </Query>
);

EventDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDisplay);
