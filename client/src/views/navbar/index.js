import React from 'react';
import { withStateHandlers, lifecycle, compose } from 'recompose';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

// icons
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import BrowseIcon from '@material-ui/icons/ImportContacts';
import SearchIcon from '@material-ui/icons/Search';
import ContactIcon from '@material-ui/icons/ContactMail';
import AboutIcon from '@material-ui/icons/FormatShapes';
import ModulesIcon from '@material-ui/icons/QueuePlayNext';

import { Link } from 'react-router-dom';

import { isDefined } from '../../utils/js-helpers';
import { getItem } from '../../utils/local-storage';

// components
import { LoggedInUser, LoggedOutUser } from './components';

const AboutLink = props => <Link to="/about" {...props} />
const ContactLink = props => <Link to="/contact" {...props} />
const SearchLink = props => <Link to="/search" {...props} />
const BrowseLink = props => <Link to="/browse" {...props} />
const HomeLink = props => <Link to="/" {...props} />

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const NavBar = (props) => {
  console.log('NavBar: ', props);
  let { classes, auth, user } = props;

  let authId;
  if (isDefined(user) && isDefined(user.sub)){
    authId = user.sub;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Users Module
          </Typography>

          <IconButton className={classes.menuButton} color="inherit" title="Home" component={HomeLink}><HomeIcon /></IconButton>
          <IconButton className={classes.menuButton} color="inherit" title="Browse the Users Directory" component={BrowseLink}><BrowseIcon /></IconButton>
          <IconButton className={classes.menuButton} color="inherit" title="Search Users" component={SearchLink}><SearchIcon /></IconButton>
          <IconButton className={classes.menuButton} color="inherit" title="Contact Form" component={ContactLink}><ContactIcon /></IconButton>
          <IconButton className={classes.menuButton} color="inherit" title="About this Module" component={AboutLink}><AboutIcon /></IconButton>
          <IconButton className={classes.menuButton} color="inherit" title="Go to another Module" component={AboutLink}><ModulesIcon /></IconButton>

          {(authId !== undefined && authId !== null) ?
            <LoggedInUser authId={authId} auth={auth} styles={styles} />
            :
            <LoggedOutUser auth={auth} styles={styles} />
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}

const getUserOnMount = { // Get user from local storage on componente mount
  componentDidMount() {
    getItem('user')
      .then(data => this.setState({ user: data })); // Set user to state
  }
};
const mapStateToProps = { // Map state user to props
  user: state => data => ({
    user: data
  })
};

const NavBarWithAuthId = compose(withStateHandlers(null, mapStateToProps),lifecycle(getUserOnMount))(NavBar);
// Note, compose flows right


export default withStyles(styles)(NavBarWithAuthId);
