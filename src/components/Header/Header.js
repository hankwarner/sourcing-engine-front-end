import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FergLogo from '../../img/ferguson-logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
<<<<<<< HEAD
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
=======
    flexGrow: 1,
>>>>>>> 311b2f34732027a19822fcc64e6d3c712ac6a98c
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.navbar} position="static">
        <Toolbar variant="dense">
<<<<<<< HEAD
          <Typography variant="p" color="inherit">
          <img className={classes.logoImage} src={FergLogo} alt="Ferguson Logo" /> Sourcing App
=======
          <Typography variant="h6" color="inherit">
            Sourcing App
>>>>>>> 311b2f34732027a19822fcc64e6d3c712ac6a98c
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}