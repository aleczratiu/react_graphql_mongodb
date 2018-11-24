import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import Edit from './Edit';

// @todo: move gql

const EDIT_EVENT = gql`
    mutation editEvent($description: String!, $id: ID!, $name: String!) {
        editEvent(description: $description, id: $id, name: $name) {
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
            questions
            updatedAt
        }
    }
`;

const EditWithData = ({ event }) => (
    <Mutation
        mutation={EDIT_EVENT}
        update={(cache, { data: { editEvent } }) => {
            const { getEvents } = cache.readQuery({ query: GET_EVENTS });
            cache.writeQuery({
                query: GET_EVENTS,
                data: {
                    getEvents: getEvents.map((event) => {
                        if (event.id !== editEvent.id) {
                            return { ...event };
                        }
                        return { ...editEvent };
                    })
                },
            });
        }}
    >
        {editEvent => <Edit event={event} onSave={data => editEvent({ variables: { ...data, id: event.id } })} />}
    </Mutation>
);

export default EditWithData;