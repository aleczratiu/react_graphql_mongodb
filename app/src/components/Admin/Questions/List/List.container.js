import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import Snackbar from 'Components/core/Snackbar';
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
            if (error) return <Snackbar>Error! {error.message}</Snackbar>;
            return <List questions={data.getQuestions} />;
        }}
    </Query>
);

export default Questions;
