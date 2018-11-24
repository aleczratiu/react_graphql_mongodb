import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
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
            if (error) console.log('Error:', error);
            return <List users={data.getUsers} />;
        }}
    </Query>
);

export default Users;
