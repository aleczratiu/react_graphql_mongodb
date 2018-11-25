import React from 'react';
import { Redirect } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EventNotFound from 'Components/core/EventNotFound';
import { getSessionToken } from 'Utils/auth';
import styles from './EventDisplay.scss';

const loggedUser = getSessionToken();

const EventDisplay = ({ event }) => {
    if (!loggedUser) {
        return <Redirect to="/register" />
    }

    if (!event) {
        return <EventNotFound />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.details}>
                <h2>{event.name}</h2>
                <div className={styles.image}>
                    <img src={event.image} />
                </div>
                <div className={styles.description}>
                    <p><b>Description:</b></p>
                    <p>{event.description}</p>
                </div>
                <List>
                    {event.questions.map((question) => (
                        <ListItem key={question.id}>
                            <ListItemIcon>
                                <QuestionAnswerIcon />
                            </ListItemIcon>
                            <ListItemText primary={question.content} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div >
    )
}

export default EventDisplay;
