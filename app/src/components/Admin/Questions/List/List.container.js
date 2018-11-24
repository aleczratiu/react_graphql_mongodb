import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import List from './List';

const GET_QUESTIONS = gql`
    query getQuestionsByEventId($eventId: ID!) {
        getQuestionsByEventId(eventId: $eventId) {
            createdAt
            content
            events
            id
            updatedAt
        }
    }
`;

const Questions = ({ eventId }) => (
    <Query query={GET_QUESTIONS} variables={{ eventId }}>
        {({ error, loading, data }) => {
            if (loading) return 'Loading...';
            if (error) console.log('Error:', error);
            return <List questions={data.getQuestions} />;
        }}
    </Query>
);

export default Questions;
