import React from 'react';

const List = ({ users }) => {
    if (!users || !users.length) return null;
    return <ul>{users.map(user => <li key={user.id}>{user.email}</li>)}</ul>;
};

export default List;
