import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import Snackbar from 'Components/core/Snackbar';
import ConfirmEmail from './ConfirmEmail';

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
        {({ error, loading, data }) => {
            console.log('data', data);
            if (loading) return 'Loading...';
            if (error) return <Snackbar>Error! {error.message}</Snackbar>;
            return <ConfirmEmail confirmEmail={data} />
        }}
    </Query>
)

export default Confirmation;