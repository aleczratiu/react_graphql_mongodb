import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import Snackbar from 'Components/core/Snackbar';
import List from './List';

const GET_QUESTIONS = gql`
    {
        getQuestions {
            createdAt
            content
            events
            id
            updatedAt
        }
    }
`;

const Questions = () => (
    <Query query={GET_QUESTIONS}>
        {({ error, loading, data }) => {
            if (loading) return 'Loading...';
            if (error) return <Snackbar>Error! {error.message}</Snackbar>;
            return <List questions={data.getQuestions} />;
        }}
    </Query>
);

export default Questions;
