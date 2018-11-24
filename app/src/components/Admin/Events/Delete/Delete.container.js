import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import Delete from './Delete';

// @todo: move gql

const DELETE_EVENT = gql`
    mutation deleteEvent($id: ID!) {
        deleteEvent(id: $id) {
            createdAt
            description
            id
            image
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

const DeleteWithData = ({ event }) => (
    <Mutation
        mutation={DELETE_EVENT}
        update={(cache, { data: { deleteEvent } }) => {
            const { getEvents } = cache.readQuery({ query: GET_EVENTS });
            cache.writeQuery({
                query: GET_EVENTS,
                data: {
                    getEvents: getEvents.filter(e => e.id !== deleteEvent.id),
                }
            });
        }}
    >
        {deleteEvent => <Delete onClick={() => deleteEvent({ variables: { id: event.id } })} />}
    </Mutation>
);

export default DeleteWithData;
