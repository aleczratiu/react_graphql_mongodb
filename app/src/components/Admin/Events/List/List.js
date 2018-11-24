import PropTypes from 'prop-types';
import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
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
                <div className={styles.summary}>
                    <span className={styles.name}>
                        {event.name}
                    </span>
                    <div>
                        <Events.Edit event={event} />
                        <Events.Delete event={event} />
                    </div>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <div className={styles.details}>
                    <div className={styles.image}>
                        <img src={event.image} />
                    </div>
                    <div className={styles.description}>
                        <p><b>Description:</b></p>
                        <p>{event.description}</p>
                    </div>
                    <Questions.List event={event} />
                    <Questions.Add event={event} />
                </div>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    ));
};

List.propTypes = {
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
};

List.defaultProps = {
    events: null,
};

export default List;
