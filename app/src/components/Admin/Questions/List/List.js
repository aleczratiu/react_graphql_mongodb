import PropTypes from 'prop-types';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const CustomList = ({ questions }) => {
    if (!questions || !questions.length) {
        return null;
    }

    return (
        <List>
            {questions.map((question) => (
                <ListItem key={question.id}>
                    <ListItemIcon>
                        <QuestionAnswerIcon />
                    </ListItemIcon>
                    <ListItemText primary={question.content} />
                </ListItem>
            ))}
        </List>
    );
};

CustomList.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.shape({
            content: PropTypes.string,
            createdAt: PropTypes.string,
            id: PropTypes.string,
            updatedAt: PropTypes.string,
        }),
    ),
};

CustomList.defaultProps = {
    questions: null,
};

export default CustomList;
