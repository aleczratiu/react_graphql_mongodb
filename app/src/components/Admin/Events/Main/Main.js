import React, { Fragment } from 'react';
import AddButton from 'Components/core/AddButton';
import PrimarySearchAppBar from 'Components/core/PrimarySearchAppBar';
import Events from '../';
import styles from './Main.scss';

const Main = () => (
    <Fragment>
        <PrimarySearchAppBar />
        <div className={styles.listContainer}>
            <Events.List />
            <AddButton />
        </div>
    </Fragment>
);

export default Main;
