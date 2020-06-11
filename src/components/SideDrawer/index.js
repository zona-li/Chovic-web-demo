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
  socialMediaButtons: {
    backgroundColor: 'MintCream',
    display: 'flex',
    justifyContent: 'space-evenly',
    paddingBottom: 10,
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

          <div className={classes.socialMediaButtons}>
            <IconButton
              target="_blank"
              href="https://www.instagram.com/chovic_/?hl=en"
            >
              <svg
                style={{ width: '27px', height: '27px' }}
                viewBox="0 0 27 27"
              >
                <path
                  fill="currentColor"
                  d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z"
                />
              </svg>
            </IconButton>
            <IconButton
              target="_blank"
              href="https://www.facebook.com/chovicdotcom/"
            >
              <svg
                style={{ width: '27px', height: '27px' }}
                viewBox="0 0 27 27"
              >
                <path
                  fill="currentColor"
                  d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"
                />
              </svg>
            </IconButton>
            <IconButton
              target="_blank"
              href="https://www.youtube.com/channel/UCtR9NOxsDouu8NtfQqUh4QQ/featured"
            >
              <svg
                style={{ width: '27px', height: '27px' }}
                viewBox="0 0 27 27"
              >
                <path
                  fill="currentColor"
                  d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"
                />
              </svg>
            </IconButton>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(SideDrawer);
