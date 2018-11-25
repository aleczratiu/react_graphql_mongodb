import gql from 'graphql-tag';
import PropTypes from 'prop-types'
import React from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import List from './List';

const GET_QUESTIONS = gql`
    query getQuestionsByEventId($eventId: ObjectID!) {
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

const Questions = ({ event, classes }) => {
    if (event && event.questions) {
        return <List questions={event.questions} />;
    }

    return (
        <Query query={GET_QUESTIONS} variables={{ eventId: event.id }}>
            {({ error, loading, data }) => {
                if (loading) return <CircularProgress className={classes.progress} />;
                if (error) console.log('Error:', error);
                return <List questions={data.getQuestions} />;
            }}
        </Query>
    );
};

Questions.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            createdAt: PropTypes.string,
            description: PropTypes.string,
            id: PropTypes.string,
            name: PropTypes.string,
            questions: PropTypes.oneOfType([
                PropTypes.arrayOf(PropTypes.string),
                PropTypes.arrayOf(
                    PropTypes.shape({
                        content: PropTypes.string,
                        createdAt: PropTypes.string,
                        id: PropTypes.string,
                        updatedAt: PropTypes.string,
                    }),
                ),
            ]),
            updatedAt: PropTypes.string,
        }),
    ),
    classes: PropTypes.object.isRequired,
};

Questions.defaultProps = {
    event: null,
};

export default withStyles(styles)(Questions);
