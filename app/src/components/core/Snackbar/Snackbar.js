import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Snackbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    toggle = () => this.setState(prevState => ({ open: !prevState.open }));

    render() {
        const { children, horizontal, vertical } = this.props;

        return (
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={this.state.open}
                onClose={this.toggle}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{children}</span>}
            />
        );
    }
}

Snackbar.propTypes = {
    children: PropTypes.node,
};

Snackbar.defaultProps = {
    children: null,
    horizontal: 'right',
    vertical: 'top',
};

export default Snackbar;
