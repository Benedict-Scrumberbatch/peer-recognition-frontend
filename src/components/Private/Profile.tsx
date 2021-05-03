import { useState, useEffect } from 'react';
// Material UI Styling
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
// Material UI Comopnents
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// Services
import UserService from '../../api/UserService';
// Assets
import PlaceholderProfileImg from '../../assets/img/kitten_placeholder.jpg';
// Types
import { UserStats } from "../../dtos/interface/userstats.interface";
import { TagStats } from '../../dtos/entity/tagstats.entity';

const styles = (theme: Theme) => createStyles({
  paper: {
    margin: theme.spacing(2, 0, 0, 0),
    padding: theme.spacing(3, 4, 3, 2),
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  profilePicLink: {
    color: "#808080"
  },
  statistics: {
    margin: theme.spacing(2, 0, 0, 0)
  },
  buttons: {
    margin: theme.spacing(2, 0, 0, 0)
  }
});

interface SimpleProps extends WithStyles<typeof styles> {
}

const Profile = withStyles(styles)(({ classes }: SimpleProps) => {
  const triggerUseEffect = true; // changing the value of this varable will rerender the useEffect hook
  // HOOKS
  const initialTagStats: TagStats[] = []
  const initialStats: UserStats = {
    numRecsReceived: 0,
    numRecsSent: 0,
    tagStats: initialTagStats
  }
  const [stats, setStats] = useState(initialStats);

  // API CALL (called every time data is updated)
  useEffect(() => {
    const userStatsAPI = new UserService();
    userStatsAPI.getStats().then(
      (stats: UserStats) => setStats(stats)

    )
  }, [triggerUseEffect])
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.wrapper}>
          <Avatar alt="profile photo" src={PlaceholderProfileImg} className={classes.avatar} />
          <Typography component="h1" variant="h4">
            John Doe
            </Typography>
          <Typography>
            <Link href="#" className={classes.profilePicLink}>Change profile picture</Link>
          </Typography>
          <Typography className={classes.statistics}>
            Recognitions Received: {stats.numRecsReceived}
          </Typography>
          <Typography>
            Recognitions Given: {stats.numRecsSent}
          </Typography>
          <Typography>
            Values Received: {stats.tagStats}
          </Typography>
          <Button variant="outlined" color="primary" className={classes.buttons}>
            View Recognitions
          </Button>
          <Button variant="contained" color="default" className={classes.buttons}>
            Sign Out
          </Button>
        </div>
      </Paper>
    </Container>
  )
});

export default Profile;