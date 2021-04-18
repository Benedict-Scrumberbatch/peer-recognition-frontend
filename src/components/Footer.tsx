// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Comopnents
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const styles = (theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "white",
    paddingBottom: theme.spacing(1),
    color: 'black',
    alignItems: 'center',
  },
});

interface SimpleProps extends WithStyles<typeof styles> {
}

const Footer = withStyles(styles)(({ classes }: SimpleProps) => {
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="body1">
          &copy; 2021 UKG
        </Typography>
      </Toolbar>
    </AppBar>
  )
});

export default Footer;