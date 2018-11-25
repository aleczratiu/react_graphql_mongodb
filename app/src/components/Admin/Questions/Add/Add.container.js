import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import Add from './Add';

// @todo: move gql

const ADD_QUESTION = gql`
    mutation addQuestion($content: String!, $eventId: ObjectID!) {
        addQuestion(content: $content, eventId: $eventId) {
            content
            createdAt
            events {
                createdAt
                description
                id
                name
                updatedAt
            }
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
            image
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
            cache.writeQuery({
                query: GET_EVENTS,
                data: {
                    getEvents: getEvents.map((e) => {
                        if (e.id === event.id) {
                            const newEvent = { ...e };
                            newEvent.questions = [...newEvent.questions, { ...addQuestion }];
                            return newEvent;
                        }
                        return { ...e };
                    }),
                },
            });
        }}
    >
        {addQuestion => <Add onSave={data => addQuestion({ variables: { ...data, eventId: event.id } })} />}
    </Mutation>
);

export default AddWithData;
