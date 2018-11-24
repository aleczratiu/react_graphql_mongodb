import React, { Fragment } from 'react';
import PrimarySearchAppBar from 'Components/core/PrimarySearchAppBar';
import Events from 'Components/Admin/Events';
import styles from './Main.scss';

const Main = () => (
    <Fragment>
        <PrimarySearchAppBar />
        <div className={styles.listContainer}>
            <Events.List />
            <Events.Add />
        </div>
    </Fragment>
);

export default Main;
