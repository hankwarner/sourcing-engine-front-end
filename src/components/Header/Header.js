import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FergLogo from '../../img/ferguson-logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logoImage: {
    width:250
  },
  navbar: {
    paddingTop:10,
    fontWeight:700
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar variant="dense">
          <Typography variant="p" color="inherit">
          <img className={classes.logoImage} src={FergLogo} alt="Ferguson Logo" /> Sourcing App for The Rest of Us
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}