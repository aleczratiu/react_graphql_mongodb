import React from 'react';

const List = ({ questions }) => {
    if (!questions || !questions.length) return null;
    return <ul>{questions.map(question => <li key={question.id}>{question.content}</li>)}</ul>;
};

export default List;
