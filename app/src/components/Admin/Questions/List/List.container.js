import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import List from './List';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types'


const GET_QUESTIONS = gql`
    query getQuestionsByEventId($eventId: ID!) {
        getQuestionsByEventId(eventId: $eventId) {
            createdAt
            content
            events
            id
            updatedAt
        }
    }
`;

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
});

const Questions = ({ eventId, classes }) => (

    <Query query={GET_QUESTIONS} variables={{ eventId }}>
        {({ error, loading, data }) => {
            if (loading) return <CircularProgress className={classes.progress} />
            if (error) console.log('Error:', error);
            return <List questions={data.getQuestions} />;
        }}
    </Query>
);

Questions.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Questions);
