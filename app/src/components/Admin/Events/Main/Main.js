import React, { Fragment, Component } from 'react';
import PrimarySearchAppBar from 'Components/core/PrimarySearchAppBar';
import Events from 'Components/Admin/Events';
import Users from 'Components/Admin/Users';
import styles from './Main.scss';

class Main extends Component {

    state = {
        toRender: (
            <div>
                <Events.List />
                <Events.Add />
            </div>),
    }

    handleRenderUsers = () => {
        this.setState({
            toRender: <Users.List />,
        })
    }

    handleRenderEvents = () => {
        this.setState({
            toRender: (
                <div>
                    <Events.List />
                    <Events.Add />
                </div>),
        });
    }

    render() {
        return (
            < Fragment >
                <PrimarySearchAppBar
                    renderUsers={this.handleRenderUsers}
                    renderEvents={this.handleRenderEvents}
                />
                <div className={styles.listContainer}>
                    {this.state.toRender}
                </div>
            </Fragment >
        );
    }

}

export default Main;
