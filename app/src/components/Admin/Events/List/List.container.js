import gql from 'graphql-tag';
import PropTypes from 'prop-types'
import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import List from './List';

const GET_EVENTS = gql`
    {
        getEvents {
            createdAt
            description
            id
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

const Events = ({ classes }) => (
    <Query query={GET_EVENTS}>
        {({ error, loading, data }) => {
            if (loading) return <CircularProgress className={classes.progress} />;
            if (error) console.log('Error:', error);
            return <List events={data.getEvents} />;
        }}
    </Query>
);

Events.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Events);
