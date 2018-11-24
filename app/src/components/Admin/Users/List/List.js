import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import styles from './List.scss';

const List = ({ users }) => {
    if (!users || !users.length) return null;

    return users.map((user) => {
        return (
            <ExpansionPanel key={user.id}>
                <ExpansionPanelSummary>
                    <div className={styles.userEmail}>{user.email}</div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className={styles.expandedPanel}>
                        <div className={styles.createdAt}>User ID: {user.id}</div>
                        <span className={styles.confirmed}>Is confirmed: {user.confirmed ? "YES" : "NO"}</span>
                        <div>
                            <span>Is admin: </span><Checkbox checked={false} onChange={console.log('Hallo!')} />
                        </div>
                        {/* <Questions.Main eventId={event.id} /> */}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    });
};

export default List;
