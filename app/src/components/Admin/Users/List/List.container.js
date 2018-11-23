import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import Snackbar from 'Components/core/Snackbar';
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

const Users = () => (
    <Query query={GET_USERS}>
        {({ error, loading, data }) => {
            if (loading) return 'Loading...';
            if (error) return <Snackbar>Error! {error.message}</Snackbar>;
            return <List users={data.getUsers} />;
        }}
    </Query>
);

export default Users;
