import React, { Component } from 'react';
// routing
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from "react-router";
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Comopnents
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// assets
import UKGLogoImg from '../assets/img/1200px-UKG_(Ultimate_Kronos_Group)_logo.svg.png';
import PlaceholderProfileImg from '../assets/img/kitten_placeholder.jpg'; 
// api
import auth from '../api/authHelper';

const styles = (theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "white",
    color: "black",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
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
});

type StylesProps = any;
type RouterProps = any;
type ComponentProps = any;
/*
interface ComponentProps {
  currency: string;
  data: any;
  header: any;
  operation : any;
}
*/

class Header extends React.Component<ComponentProps & StylesProps & RouterProps>  {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { classes, history } = this.props;
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
    )
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(Header));