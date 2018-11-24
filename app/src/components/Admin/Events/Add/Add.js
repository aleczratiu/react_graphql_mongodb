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
            description: props.event && props.event.description ? props.event.description : '',
            name: props.event && props.event.name ? props.event.name : '',
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            description: nextProps.event && nextProps.event.description ? nextProps.event.description : '',
            name: nextProps.event && nextProps.event.name ? nextProps.event.name : '',
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
                            label="Event name"
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <TextField
                            id="event-description"
                            label="Event description"
                            value={this.state.description}
                            onChange={this.handleChange('description')}
                            margin="normal"
                        />
                    </form>
                    <Button variant="text">*TODO* Add image</Button>
                    <Button variant="text">*TODO* Generate QR</Button>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" onClick={this.handleConfirm} size="large">
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
                <Button fullWidth onClick={this.handleClickOpen}>
                    + Add event
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
