import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import Delete from './Delete';

// @todo: move gql

const DELETE_QUESTION = gql`
    mutation deleteQuestion($id: ID!) {
        deleteQuestion(id: $id) {
            createdAt
            description
            id
            name
            questions
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

const DeleteWithData = ({ question }) => (
    <Mutation
        mutation={DELETE_QUESTION}
        update={(cache, { data: { deleteQuestion } }) => {
            const { getEvents } = cache.readQuery({ query: GET_EVENTS });
            cache.writeQuery({
                query: GET_EVENTS,
                data: {
                    getEvents: getEvents.map((e) => {
                        if (deleteQuestion.events.includes(e.id)) {
                            const newEvent = { ...e };
                            newEvent.questions.filter(q => q.id !== deleteQuestion.id);
                            return newEvent;
                        }
                        return { ...e };
                    }),
                }
            });
        }}
    >
        {deleteQuestion => <Delete onClick={() => deleteQuestion({ variables: { id: question.id } })} />}
    </Mutation >
);

export default DeleteWithData;
