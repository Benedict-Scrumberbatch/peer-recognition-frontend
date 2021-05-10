import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
// Utility to combine classnames
import clsx from 'clsx';
// Material UI Styling
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
// Material UI Components
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
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
import NotificationsIcon from '@material-ui/icons/Notifications';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ClearIcon from '@material-ui/icons/Clear';

// api
import auth from '../../api/authHelper';
import Post from '../Feed/Post';
import UserService from '../../api/UserService';
import { Users } from '../../dtos/entity/users.entity';
/*
  Navigation Menu holds
    - navbar (for settings)
    - div to move all content down (so not obscurbed by navbar)
    - sidebar for route navigation
*/

const drawerWidth = 300;

const routeData = [
  { text: "Profile", link: `/profile`, iconFunc: () => { return <AccountBoxIcon /> } },
  { text: "Settings", link: "/settings", iconFunc: () => { return <SettingsIcon /> } },
  { text: "Feed", link: "/feed", iconFunc: () => { return <DynamicFeedIcon /> } },
]

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarRightIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbarLeftIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    // position: 'relative',
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
  appBarSpacer: {
    height: '15vh',
  },
  appBarSpacerBottom: {
    height: '15vh',
  },
  content: {
    flexGrow: 1,
    height: '84vh',
    overflow: 'auto',
    // marginBottom: '15vh'
  },
}));
export default function PrivateNavbar(props: any) {
  const triggerUseEffect = true;
  const classes = useStyles(); // Material UI Styling
  const theme = useTheme(); // Material UI Theming
  const history = useHistory(); // React Router history hook
  const [notificationOpen, setNotificationOpen] = useState(false);
  const initialUser: Users = new Users();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(initialUser);

  const toggleDrawer = (open: boolean) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  };

  const toggleNotifications = (open: any) => (event: any) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setNotificationOpen(open);
  };

  useEffect(() => {
    const userStatsAPI = new UserService();
    userStatsAPI.getUserProfile()
    .then((user: Users) => {
      setUser(user);
    })
    .catch((err) => {
      alert("No such profile");
      console.log("User error");
    })
  }, [triggerUseEffect])

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
          <div className={classes.grow} />
          {auth.isAuthenticated() &&
            <div>
              <Button variant="contained" onClick={() => auth.signout(() => history.push("/"))}>Signout</Button>
            </div>
          }
          <IconButton
            edge="end"
            color="inherit"
            aria-label="open notifications"
            onClick={toggleNotifications(true)}
            className={clsx(classes.menuButton, notificationOpen && classes.menuButtonHidden)}
          >
            <NotificationsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        anchor="left"
        open={open}
      >
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <div className={classes.toolbarRightIcon}>
            <IconButton onClick={toggleDrawer(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {routeData.map((obj, idx) => {
              if (obj.text === "Profile") {                
                obj.link = `/profile/${user.employeeId}`
              }
              return (
                <Link to={obj.link} key={obj.text + idx} style={{ textDecoration: 'none', color: 'black' }}>
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
      <Drawer
        classes={{
          paper: clsx(classes.drawerPaper, !notificationOpen && classes.drawerPaperClose),
        }}
        anchor="right"
        open={notificationOpen}
      >
        <div
          role="presentation"
          onClick={toggleNotifications(false)}
          onKeyDown={toggleNotifications(false)}
        >
          <div className={classes.toolbarLeftIcon}>
            <IconButton onClick={toggleNotifications(false)}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
          <Card variant="outlined">
          <CardHeader
              action={
                <IconButton aria-label="dismiss">
                  <ClearIcon />
                </IconButton>
              }
              title="NotificationTitle"
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography  color="textSecondary" gutterBottom>
                Notification Description
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card variant="outlined">
          <CardHeader
              action={
                <IconButton aria-label="dismiss">
                  <ClearIcon />
                </IconButton>
              }
              title="NotificationTitle"
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography  color="textSecondary" gutterBottom>
                Notification Description
              </Typography>
            </CardContent>
            <CardActions>
              <Button>
                <Post recognition={{msg:"some message here", tags: [{tagId: 1, value:"tag1"}, {tagId: 2, value: "tag2"}], empTo: {firstName: 'john', lastName: 'Snow'}, empFrom: {firstName: 'Bob', lastName: 'Marley'}}}></Post>
              </Button>
            </CardActions>
          </Card>
        </div>
      </Drawer>
      <main className={classes.content} id="content-scroll">
        <div className={classes.appBarSpacer} />
        {props.children}
      <div className={classes.appBarSpacerBottom} />
      </main>
    </div>
  );
}