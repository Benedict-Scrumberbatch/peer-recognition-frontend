import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import UKGLogoImg from '../assets/img/1200px-UKG_(Ultimate_Kronos_Group)_logo.svg.png';
import PlaceholderProfileImg from '../assets/img/kitten_placeholder.jpg'; 

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "white",
    color: "black"
  },
  logo: {
    marginRight: theme.spacing(2),
    maxWidth: 160
  },
  profileCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    objectFit: 'cover'
  }
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <img src={UKGLogoImg} alt="logo" className={classes.logo} />
          <div className={classes.grow} />
          <img src={PlaceholderProfileImg} alt="profile photo" className={classes.profileCircle} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
