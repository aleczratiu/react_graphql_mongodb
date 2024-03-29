import gql from 'graphql-tag';
import React from 'react';
import { Mutation } from 'react-apollo';
import Add from './Add';

// @todo: move gql

const ADD_EVENT = gql`
    mutation addEvent($description: String!, $image: String, $name: String!) {
        addEvent(description: $description, image: $image, name: $name) {
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

const AddWithData = () => (
    <Mutation
        mutation={ADD_EVENT}
        update={(cache, { data: { addEvent } }) => {
            const { getEvents } = cache.readQuery({ query: GET_EVENTS });
            cache.writeQuery({
                query: GET_EVENTS,
                data: {
                    getEvents: [...getEvents, { ...addEvent }],
                }
            });
        }}
    >
        {addEvent => <Add onSave={data => addEvent({ variables: data })} />}
    </Mutation>
);

export default AddWithData;
