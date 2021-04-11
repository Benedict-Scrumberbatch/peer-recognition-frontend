import React, { Component } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Comopnents
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PlaceholderProfileImg from '../../assets/img/kitten_placeholder.jpg'; 

import UserService from '../../api/UserService';
import { UserStats } from '../../dtos/interface/userstats.interface';

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

interface Props extends WithStyles<typeof styles>{}

interface ProfileState {
  stats: UserStats
}

class Profile extends Component<Props, ProfileState> {
  constructor(props: any) {
    super(props)
    this.state = {
      stats: {
        numRecsReceived: 0,
        numRecsSent: 0,
        tagStats: [],
      }
    };
  }

  async componentDidMount() {
    const userStatsAPI = new UserService();
    const stats = await userStatsAPI.getStats();
    this.setState({
      stats: stats,
    });
  }

  render() {
    const { classes } = this.props;
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
              Recognitions Received: {this.state.stats.numRecsReceived}
            </Typography>
            <Typography> 
              Recognitions Given: {this.state.stats.numRecsSent}
            </Typography>
            <Typography> 
              Values Received: 
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
  }
}

export default withStyles(styles, { withTheme: true })(Profile);  