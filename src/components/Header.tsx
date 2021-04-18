// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Comopnents
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// assets
import UKGLogoImg from '../assets/img/1200px-UKG_(Ultimate_Kronos_Group)_logo.svg.png';
import PlaceholderProfileImg from '../assets/img/kitten_placeholder.jpg'; 

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

interface SimpleProps extends WithStyles<typeof styles> {
}

const Header = withStyles(styles)(({ classes }: SimpleProps) => {
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
});

export default Header;