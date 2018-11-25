import gql from 'graphql-tag';
import PropTypes from 'prop-types'
import React from 'react';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Error from 'Components/core/Error';
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

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});


const Confirmation = ({ match }) => (
    <Query query={CONFIRM_EMAIL} variables={{ id: match.params.id }}>
        {({ error, loading, data }) => {
            if (loading) return <CircularProgress className={classes.progress} />;
            if (error) return <Error error={error} />;
            return <ConfirmEmail confirmEmail={data} />;
        }}
    </Query>
)

Confirmation.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Confirmation);
