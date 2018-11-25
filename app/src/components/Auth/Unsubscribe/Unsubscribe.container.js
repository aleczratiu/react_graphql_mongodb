import gql from 'graphql-tag';
import React, { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { setUser } from 'Actions/loggedUser';
import Snackbar from 'Components/core/Snackbar';
import Unsubscribe from './Unsubscribe';

const UnsubscribeMutation = gql`
    mutation updateSubscribe($id: ObjectID!, $subscribe: Boolean!) {
        updateSubscribe(id: $id, subscribe: $subscribe) {
            id,
            email,
            subscribe
        }
    }
`;

const UnsubscribeWithData = ({ match, setUser, user }) => (
    <Mutation
        mutation={UnsubscribeMutation}
        update={(cache, { data: { updateSubscribe } }) => {
            setUser(updateSubscribe);
        }}
        variables={{ id: match.params.id, subscribe: false }}
    >
        {(updateSubscribe) => <Unsubscribe mutate={updateSubscribe} user={user} />}
    </Mutation>
);

export default connect(
    (state) => ({
        user: state.loggedUser,
    }),
    {
        setUser,
    },
)(UnsubscribeWithData);
