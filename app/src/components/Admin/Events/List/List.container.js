import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
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
            if (error) console.log('Error:', error);
            return <List events={data.getEvents} />;
        }}
    </Query>
);

export default Events;
