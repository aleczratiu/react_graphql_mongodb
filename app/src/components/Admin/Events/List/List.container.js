import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import Snackbar from 'Components/core/Snackbar';
import List from './List';

const GET_EVENTS = gql`
    {
        getEvents {
            createdAt
            description
            id
            name
            questions
            updatedAt
        }
    }
`;

const Events = () => (
    <Query query={GET_EVENTS}>
        {({ error, loading, data }) => {
            if (loading) return 'Loading...';
            if (error) return <Snackbar>Error! {error.message}</Snackbar>;
            return <List events={data.getEvents} />;
        }}
    </Query>
);

export default Events;
