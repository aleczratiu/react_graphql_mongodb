import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Events from 'Components/Admin/Events';
import Questions from 'Components/Admin/Questions';
import styles from './List.scss';

const List = ({ events }) => {
    if (!events || !events.length) {
        return null;
    }

    return events.map((event) => (
        <ExpansionPanel key={event.id}>
            <ExpansionPanelSummary>
                <div className={styles.row}>
                    <span className={styles.eventName}>{event.name}</span>
                    <span className={styles.rowFill} />
                    <Events.Edit event={event} />
                    <Events.Delete event={event} />
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div>{event.description}</div>
                {/* <Questions.Main eventId={event.id} /> */}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    ));
};

List.propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
    })),
};

List.defaultProps = {
    events: null,
};

export default List;
