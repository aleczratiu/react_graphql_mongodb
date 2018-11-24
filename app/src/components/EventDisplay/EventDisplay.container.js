import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import Snackbar from 'Components/core/Snackbar';
import Test from './EventDisplay';

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
console.log('here');
const EventDisplay = ({ match }) => (
    <Query query={GET_EVENT_BY_ID} variables={{ id: match.params.id }}>
        {({ error, loading, data }) => {
            localStorage.setItem('EVENT', match.url);
            if (loading) return 'Loading...';
            if (error) return <Snackbar>Error! {error.message}</Snackbar>;
            return <Test data={data.getEventById} />;
        }}
    </Query>
);

export default EventDisplay;
