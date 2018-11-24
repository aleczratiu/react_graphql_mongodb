import React, { Component, Fragment } from 'react';
import { renderQrImage } from '../../utils/generateQR';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
};

class App extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
            <div className={classes.root}>
                <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                    Pied Piper
                    </Typography>
                    <Button color="inherit"><Link to={"/register"} style={{ textDecoration: 'none', color: "inherit" }}>Register</Link></Button>
                </Toolbar>
                </AppBar>
            </div>
                {renderQrImage('https://7cf2a576.ngrok.io/eventdisplay/5bf8cbf1dac5ac00327cd2ed', 350)}
            </Fragment>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
