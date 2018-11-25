import gql from 'graphql-tag';
import PropTypes from 'prop-types'
import React from 'react';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Error from 'Components/core/Error';
import List from './List';

const GET_USERS = gql`
    {
        getUsers {
            createdAt
            email
            firstName
            id
            lastName
            privileges
            updatedAt
        }
    }
`;

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

const Users = ({ classes }) => (
    <Query query={GET_USERS}>
        {({ error, loading, data }) => {
            if (loading) return <CircularProgress className={classes.progress} />
            if (error) return <Error error={error} />;
            return <List users={data.getUsers} />;
        }}
    </Query>
);

Users.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Users);


