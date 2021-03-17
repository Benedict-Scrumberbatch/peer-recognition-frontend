import React, { Component } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import {Grid, Modal, Dialog} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
// Material UI Comopnents
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import PlaceholderProfileImg from '../../assets/img/kitten_placeholder.jpg'; 
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    width: '125px',
    height: '125px'
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


type State = { contactOpen: boolean, passwordOpen : boolean };
interface Props extends WithStyles<typeof styles>{ }

class Settings extends Component<Props,State> {
  constructor(props: any) {
    super(props)
    this.state = {
        contactOpen : false,
        passwordOpen : false,
    }
    this.handleContactOpen = this.handleContactOpen.bind(this)
    this.handleContactClose = this.handleContactClose.bind(this)
    this.handlePasswordOpen = this.handlePasswordOpen.bind(this)
    this.handlePasswordClose = this.handlePasswordClose.bind(this)
    
  }

  handleContactOpen = () => {
    this.setState({
        contactOpen : true
    })
  };

  handleContactClose = () => {
    this.setState({
        contactOpen : false
    })
  };

  handlePasswordOpen = () => {
    this.setState({
        passwordOpen : true
    })
  };

  handlePasswordClose = () => {
    this.setState({
        passwordOpen : false
    })
  };

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
              Email: JDoe@ukg.com
            </Typography>
            <Typography>
              Phone Number: (401)-867-5309
            </Typography>


            <div id="edit-contact-info">
              <Button variant="outlined" color="primary" className={classes.buttons} onClick={this.handleContactOpen}>
                Edit Contact Info
            </Button>
              <Dialog open={this.state.contactOpen} onClose={this.handleContactClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Change Contact Info</DialogTitle>
                <DialogContent>
                  <TextField disabled id="old-email" label="Old-Email" defaultValue="JDoe@ukg.com" />
                  <TextField
                    margin="dense"
                    id="new-email"
                    label="New email"
                    type="email"
                    fullWidth
                  />
                  <TextField disabled id="old-phone-number" label="Old Phone Number" defaultValue="(401)-867-5309" />
                  <TextField
                    margin="dense"
                    id="new-phone-number"
                    label="New Phone Number"
                    type='number'
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleContactClose}>
                    Cancel
          </Button>
                  <Button onClick={this.handleContactClose} >
                    Save
          </Button>
                </DialogActions>
              </Dialog>
            </div>


            <div id="edit-password">
              <Button variant="outlined" color="primary" className={classes.buttons} onClick={this.handlePasswordOpen}>
                Change Password
            </Button>
              <Dialog open={this.state.passwordOpen} onClose={this.handlePasswordClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Change Password</DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    id="old-password"
                    label="Old password"
                    type="password"
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="new-password"
                    label="New Password"
                    type='password'
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="re-enter-new-password"
                    label="Re-enter New Password"
                    type='password'
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handlePasswordClose}>
                    Cancel
          </Button>
                  <Button onClick={this.handlePasswordClose} >
                    Save
          </Button>
                </DialogActions>
              </Dialog>
            </div>

            

          </div>
        </Paper>
      </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Settings);  