import PropTypes from 'prop-types';
import React from 'react';

const List = ({ questions }) => {
    if (!questions || !questions.length) {
        return null;
    }

    return questions.map((question) => (
        <ExpansionPanel key={question.id}>
            <ExpansionPanelSummary>
                <Typography>{question.content}</Typography>
            </ExpansionPanelSummary>
        </ExpansionPanel>
    ));
};

List.propTypes = {
    questions: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        id: PropTypes.string,
    })),
};

List.defaultProps = {
    questions: null,
};

export default List;
