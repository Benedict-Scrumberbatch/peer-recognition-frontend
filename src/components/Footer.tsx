import React from 'react';
// Material UI Comopnents
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "white",
    paddingBottom: theme.spacing(1),
    color: 'black',
    alignItems: 'center',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="body1">
          &copy; 2021 UKG
        </Typography>
      </Toolbar>
    </AppBar>
  )
}