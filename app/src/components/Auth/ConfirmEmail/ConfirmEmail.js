import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import Snackbar from 'Components/core/Snackbar';

const CONFIRM_EMAIL = gql`
    query confirmEmail(
    $id: String!,
    ) {
    confirmEmail (
        id: $id
    ) {
        id,
        email,
        confirmed
    }
}
`;

const Confirmation = ({ match }) => (
    <Query query={CONFIRM_EMAIL} variables={{ id: match.params.id }}>
        {({ error, loading, data: { confirmEmail } }) => {
            if (loading) return 'Loading...';
            if (error) return <Snackbar>Error! {error.message}</Snackbar>;
            if (confirmEmail.confirmed) {
                return <Redirect to='/' />
            }
        }}
    </Query>
)

export default Confirmation;
