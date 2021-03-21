import React from 'react';
import { Link } from 'react-router-dom';
// Material UI Styling
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
// Material UI Components
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
// Material UI - navbar icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// Material UI - sidebar icons
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
/*
  Navigation Menu holds
    - navbar (for settings)
    - div to move all content down (so not obscurbed by navbar)
    - sidebar for route navigation
*/

const drawerWidth = 240;

const routeData = [
  { text: "Profile", link: '/profile', iconFunc: () => { return <AccountBoxIcon /> } },
  { text: "Settings", link: "/settings", iconFunc: () => { return <SettingsIcon /> } },
  { text: "Feed", link: "/feed", iconFunc: () => { return <DynamicFeedIcon /> } },
]

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuButtonHidden: {
    display: 'none',
  },
  logo: {
    height: '50px',
  },
  divider: {
    margin: theme.spacing(0, 0.5),
    background: "white",
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));
    

export default function PersistentDrawerLeft(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  };

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="relative"
        className={clsx(classes.appBar, open && classes.appBarShift)}
        style={{
          backgroundColor: '#393e46',
          backgroundBlendMode: "normal,luminosity",
          backdropFilter: 'blur(5px)',
          boxShadow: '3px 6px 20px rgba(104,102,255,.44), -3px -6px 10px hsla(0,0%,100%,.6)'
        }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={toggleDrawer(false)}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {routeData.map((obj: any, idx: Number) => {
              return (
                <Link to={obj.link} key={obj.text + idx} style={{textDecoration: 'none', color: 'black' }}>
                  <li>
                    <ListItem button>
                      <ListItemIcon>{obj.iconFunc()}</ListItemIcon>
                      <ListItemText primary={
                        <Typography variant="h6">{obj.text}</Typography>
                      } />
                    </ListItem>
                  </li>
                </Link>
              )
            })}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children}
      </main>
    </div>
  );
}