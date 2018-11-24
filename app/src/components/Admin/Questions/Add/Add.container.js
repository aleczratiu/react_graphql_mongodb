import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import Add from './Add';

// @todo: move gql

const ADD_QUESTION = gql`
    mutation addQuestion($content: String!, $eventId: ID!) {
        addQuestion(content: $content, eventId: $eventId) {
            content
            createdAt
            id
            updatedAt
        }
    }
`;

const GET_EVENTS = gql`
    {
        getEvents {
            createdAt
            description
            id
            name
            questions {
                content
                createdAt
                id
                updatedAt
            }
            updatedAt
        }
    }
`;

const GET_QUESTIONS = gql`
    {
        getQuestions {
            content
            createdAt
            id
            updatedAt
        }
    }
`;

const AddWithData = ({ event }) => (
    <Mutation
        mutation={ADD_QUESTION}
        update={(cache, { data: { addQuestion } }) => {
            const { getEvents } = cache.readQuery({ query: GET_EVENTS });
            const { getQuestions } = cache.readQuery({ query: GET_QUESTIONS });

            const eventId = addQuestion.events[0];

            cache.writeQuery({
                query: GET_EVENTS,
                data: {
                    getEvents: getEvents.map((event) => {
                        if (event.id === eventId) {
                            return { ...addQuestion };
                        }
                        return { ...event };
                    }),
                },
            });

            cache.writeQuery({
                query: GET_QUESTIONS,
                data: {
                    getQuestion: [...getQuestions, addQuestion],
                },
            });
        }}
    >
        {(addQuestion) => {
            // addQuestion({
            //     variables: {
            //         content: 'My first question',
            //         eventId: '1',
            //     },
            // });
            return (
                <p>Add question</p>
            );
        }}
    </Mutation>
);

export default AddWithData;
