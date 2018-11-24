import React from 'react';
import { Link } from 'react-router-dom';
import { removeSessionToken } from 'Utils/auth';
import styles from './NotAdmin.scss';

removeSessionToken();

const NotAdmin = () => (
    <div className={styles.container}>
        <span className={styles.notFound}>404 Not Authorized</span>
        <span className={styles.lookingFor}>{"We're sorry, but you are not Authorized."}</span>
        <Link to='/login'>Login</Link>
    </div>
);

export default NotAdmin;
