import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import Navigation from '../Navigation';
import { withStyles } from '@material-ui/core';

const styles = {
  iconButton: {
    margin: '20px',
    color: 'Teal',
    '& svg': {
      fontSize: 35,
    },
  },
  drawer: {
    position: 'fixed',
    top: 0,
  },
  drawerList: {
    width: 250,
    backgroundColor: 'MintCream',
    height: '100%',
  },
};

class SideDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  toggleDrawer = () => {
    this.setState(({ open }) => {
      return { open: !open };
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.drawer}>
        <IconButton
          aria-label="Open drawer"
          onClick={this.toggleDrawer}
          className={classes.iconButton}
          disableRipple={false}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={this.state.open}
          onClose={this.toggleDrawer}
        >
          <div
            className={classes.drawerList}
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer}
            onKeyDown={this.toggleDrawer}
          >
            <Navigation />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(SideDrawer);
