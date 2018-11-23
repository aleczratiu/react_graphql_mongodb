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

const Events = () => (
    <Query query={GET_USERS}>
        {(par) => {
            console.log({ par });
            const { error, loading, data } = par;
            if (loading) return 'Loading...';
            if (error) return <Snackbar>Error! {error.message}</Snackbar>;
            return <List users={data.getUsers} />;
        }}
    </Query>
);

export default Events;
