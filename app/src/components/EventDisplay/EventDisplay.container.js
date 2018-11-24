import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import EVD from './EventDisplay';

const GET_EVENT_BY_ID = gql`
    query getEventById(
    $id: String!,
    ) {
    getEventById (
        id: $id
    ) {
        id,
        description,
        createdAt,
        updatedAt
        questions
    }
}
`;
const EventDisplay = ({ match }) => (
    <Query query={GET_EVENT_BY_ID} variables={{ id: match.params.id }}>
        {({ error, loading, data }) => {
            localStorage.setItem('EVENT', match.url);
            if (loading) return 'Loading...';
            if (error) console.log('Error:', error);
            return <EVD data={data} />;
        }}
    </Query>
);

export default EventDisplay;
