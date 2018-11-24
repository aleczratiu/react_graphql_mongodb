import React, { Fragment } from 'react';
import Questions from 'Components/Admin/Questions';
import styles from './Main.scss';

const Main = () => (
    <Fragment>
        <div className={styles.listContainer}>
            <Questions.List />
            {/* <Questions.Add /> */}
        </div>
    </Fragment>
);

export default Main;
