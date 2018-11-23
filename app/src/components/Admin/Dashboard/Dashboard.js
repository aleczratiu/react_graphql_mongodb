import React from 'react';
import Events from '../Events';
import Questions from '../Questions';
import Users from '../Users';

const Dashboard = () => (
    <div>
        <h1>Events</h1>
        <Events.List />
        <h1>Questions</h1>
        <Questions.List />
        <h1>Users</h1>
        <Users.List />
    </div>
);

export default Dashboard;
