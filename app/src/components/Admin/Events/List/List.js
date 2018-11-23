import React from 'react';

const List = ({ events }) => {
    if (!events || !events.length) return null;
    return <ul>{events.map(event => <li key={event.id}>{event.title}</li>)}</ul>;
};

export default List;
