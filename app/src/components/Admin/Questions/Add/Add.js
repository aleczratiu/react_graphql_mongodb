import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

class AddOrEditEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
        };
    }

    componentWillReceiveProps() {
        this.setState({
            content: '',
        })
    }

    handleChange = property => event => this.setState({
        [property]: event.target.value,
    });

    handleConfirm = () => {
        this.props.onSave(this.state);
        this.props.onClose();
    };

    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogContent>
                    <form noValidate autoComplete="off">
                        <TextField
                            id="event-name"
                            label="Question"
                            value={this.state.content}
                            onChange={this.handleChange('content')}
                            margin="normal"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.handleConfirm}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AddOrEditEvent.propTypes = {
    event: PropTypes.shape({
        description: PropTypes.string,
        name: PropTypes.string,
    }),
    onSave: PropTypes.func.isRequired,
};

AddOrEditEvent.defaultProps = {
    event: null,
};

class Add extends Component {
    state = {
        open: false,
    };

    handleClickOpen = () => this.setState({ open: true });

    handleClose = () => this.setState({ open: false });

    render() {
        return (
            <Fragment>
                <Button onClick={this.handleClickOpen}>
                    + Add question
                </Button>
                <AddOrEditEvent
                    open={this.state.open}
                    onClose={this.handleClose}
                    onSave={this.props.onSave}
                />
            </Fragment>
        );
    }
}

Add.propTypes = {
    onSave: PropTypes.func.isRequired,
};

export default Add;
