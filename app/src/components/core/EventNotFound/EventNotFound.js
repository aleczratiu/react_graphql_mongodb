import React from 'react';
import { Link } from 'react-router-dom';
import styles from './EventNotFound.scss';

const EventNotFound = () => (
    <div className={styles.container}>
        <span className={styles.notFound}>404 Event Not Found</span>
        <span className={styles.lookingFor}>{"We're sorry, but the event you're looking for does not exist."}</span>
        <Link to={'/login'}>
            <button className={styles.visit}>Go back</button>
        </Link>
    </div>
);

export default EventNotFound;
