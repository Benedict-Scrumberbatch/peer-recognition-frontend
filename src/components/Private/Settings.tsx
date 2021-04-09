import React, { Component } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { Grid, Modal, Dialog } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

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

import SettingsService from '../../api/SettingsService';

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


type SettingsType = {
  contactOpen: boolean, passwordOpen: boolean, deleteOpen: boolean, createOpen: boolean,
  createUsers: object, deleteUsers: object
};
interface Props extends WithStyles<typeof styles> { }

class Settings extends Component<Props, SettingsType> {
  constructor(props: any) {
    super(props)
    this.state = {
      contactOpen: false,
      passwordOpen: false,
      deleteOpen: false,
      createOpen: false,
      createUsers: {
        firstName: "",
        lastName: "",
        companyId: 0,
        password: "",
        positionTitle: "",
        companyName: "",
        isManager: false,
        employeeId: 0,
        email: "",
        startDate: ""
      },
      deleteUsers: {
        companyId: 0,
        employeeId: 0
      }
    }
  }

  componentDidMount() {
    const settingsAPI = new SettingsService();
    settingsAPI.getSettings()
      .then((response: any) => {
        console.log(response);
        this.setState({
          createUsers: response
        })
      });
  }

  handleContactOpen = () => {
    this.setState({
      contactOpen: true
    })
  };

  handleContactClose = () => {
    this.setState({
      contactOpen: false
    })
  };

  handlePasswordOpen = () => {
    this.setState({
      passwordOpen: true
    })
  };

  handlePasswordClose = () => {
    this.setState({
      passwordOpen: false
    })
  };

  handleDeleteUserOpen = () => {
    this.setState({
      deleteOpen: true
    })
  };
  handleDeleteUserClose = () => {
    this.setState({
      deleteOpen: false
    })
  };

  handleCreateUserOpen = () => {
    this.setState({
      createOpen: true
    })
  };
  handleCreateUserClose = () => {
    this.setState({
      createOpen: false
    })
  };
  handleCreateUserSave = () => {
    this.setState({
      createOpen: false
    })
  };
  // handleChange = ({target}) => {
  //   this.setState({
  //     [target.name]: target.value
  //   })
  // };

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


            <div id="admin-settings">


              <div id="create-user">
                <Button variant="outlined" color="primary" className={classes.buttons} onClick={this.handleCreateUserOpen}>
                  Create Users
            </Button>
                <Dialog open={this.state.createOpen} onClose={this.handleCreateUserClose} aria-labelledby="form-dialog-title" >
                  <DialogTitle id="form-dialog-title">Create User</DialogTitle>
                  <DialogContent>
                    Please upload JSON file of employees you would like to add:
                  <TextField
                      margin="dense"
                      id="employees-json"
                      type='file'
                      fullWidth
                    />
                    Or manually add an individual user:
                    <TextField
                    margin="dense"
                    id="user-fname"
                    label="First Name"
                    type="text"
                    // value={this.state.createUsers}
                    // onChange={this.handleChange}
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="user-lname"
                    label="Last Name"
                    type='text'
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="user-email"
                    label="Email Address"
                    type='test'
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="user-id"
                    label="Employee ID Number"
                    type='number'
                    fullWidth
                  />

                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCreateUserClose}>
                      Cancel
          </Button>
                    <Button onClick={this.handleCreateUserSave} >
                      Save
          </Button>
                  </DialogActions>
                </Dialog>
              </div>


              <div id="delete-user">
                <Button variant="outlined" color="secondary" className={classes.buttons} onClick={this.handleDeleteUserOpen}>
                  Delete User
            </Button>
                <Dialog open={this.state.deleteOpen} onClose={this.handleDeleteUserClose} aria-labelledby="form-dialog-title" >
                  <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
                  <DialogContent>
                    <TextField
                      margin="dense"
                      id="employee-id"
                      label="Employee ID"
                      type='number'
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleDeleteUserClose}>
                      Cancel
          </Button>
                    <Button onClick={this.handleDeleteUserClose} >
                      Save
          </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>


          </div>
        </Paper>
      </Container>
    )
  }
}


export default withStyles(styles, { withTheme: true })(Settings);