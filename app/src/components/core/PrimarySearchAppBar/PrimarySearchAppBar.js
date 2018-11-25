import PropTypes from 'prop-types';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Query } from 'react-apollo'

const GET_EVENTS = gql`
    {
        getEvents {
            createdAt
            description
            id
            name
            questions {
                content
                createdAt
                id
                updatedAt
            }
            updatedAt
        }
    }
`;


const styles = theme => ({
    root: {
        background: '#0071CE',
        width: '100%',
        sort: "",
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 30
        },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
        }
    },
});

class PrimarySearchAppBar extends Component {
    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null,
        sort: '',
        sortOrder: this.props.sortOrder
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleLogout = () => {
        localStorage.clear();
        this.props.logOut();
        location.reload();
    }

    handleRenderUsers = () => {
        this.props.renderUsers();
        this.handleMenuClose();
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleRenderEvents = () => {
        this.props.renderEvents();
        this.handleMenuClose();
    }

    handleMobileMenuOpen = event => this.setState({ mobileMoreAnchorEl: event.currentTarget });

    handleMobileMenuClose = () => this.setState({ mobileMoreAnchorEl: null });

    render() {
        const { anchorEl, mobileMoreAnchorEl, sort } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleRenderEvents}>Events</MenuItem>
                <MenuItem onClick={this.handleRenderUsers}>Users</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            {this.props.title}
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <Query query={GET_EVENTS}>
                        {({ data, loading, error })=> {
                          if( loading ) return <div>Loading</div>
                          if( error ) return <div>Error</div>

                          return(
                            <Fragment>
                                {console.log(data)}
                            </Fragment>
                          );
                        }}
                      </Query>

                        <FormControl className={classes.formControl}>
                            <Select
                            value={sort}
                            onChange={this.handleChange}
                            name="sort"
                            displayEmpty
                            className={classes.selectEmpty}
                            style={{ color: 'white' }}
                            >
                            <MenuItem value="" disabled>
                                SORT
                            </MenuItem>
                            <MenuItem value={1}>NEWEST</MenuItem>
                            <MenuItem value={-1}>OLDEST</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                {renderMobileMenu}
            </div>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    logOut: PropTypes.func.isRequired,
    renderUsers: PropTypes.func.isRequired,
    renderEvents: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

PrimarySearchAppBar.defaultProps = {
    title: 'Dashboard',
};

export default withStyles(styles)(PrimarySearchAppBar);
