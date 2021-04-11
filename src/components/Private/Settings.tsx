import { useState, useEffect } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import { Grid, Modal, Dialog } from "@material-ui/core";
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

interface SimpleProps extends WithStyles<typeof styles> {
  contactOpen: boolean, passwordOpen: boolean, deleteOpen: boolean, createOpen: boolean,
  createUsers: object, deleteUsers: object
}

const Settings = withStyles(styles)(({ classes }: SimpleProps) => {
  const [contactOpen, setContactOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [createUsers, setCreateUsers] = useState({
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
  });
  const [deleteUsers, setDeleteUsers] = useState({
    companyId: 0,
    employeeId: 0
  });

  useEffect(() => {

    const settingsAPI = new SettingsService();
    settingsAPI.getSettings()
      .then((response: any) => {
        setCreateUsers(response)
      });
  })

  const handleContactOpen = () => setContactOpen(true)
  const handleContactClose = () => setContactOpen(false)
  const handlePasswordOpen = () => setPasswordOpen(true)
  const handlePasswordClose = () => setPasswordOpen(false)
  const handleDeleteUserOpen = () => setDeleteOpen(true)
  const handleDeleteUserClose = () => setDeleteOpen(false)
  const handleCreateUserOpen = () => setCreateOpen(true)
  const handleCreateUserClose = () => setCreateOpen(false)

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
            <Button variant="outlined" color="primary" className={classes.buttons} onClick={handleContactOpen}>
              Edit Contact Info
          </Button>
            <Dialog open={contactOpen} onClose={handleContactClose} aria-labelledby="form-dialog-title" >
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
                <Button onClick={handleContactClose}>
                  Cancel
        </Button>
                <Button onClick={handleContactClose} >
                  Save
        </Button>
              </DialogActions>
            </Dialog>
          </div>


          <div id="edit-password">
            <Button variant="outlined" color="primary" className={classes.buttons} onClick={handlePasswordOpen}>
              Change Password
          </Button>
            <Dialog open={passwordOpen} onClose={handlePasswordClose} aria-labelledby="form-dialog-title" >
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
                <Button onClick={handlePasswordClose}>
                  Cancel
        </Button>
                <Button onClick={handlePasswordClose} >
                  Save
        </Button>
              </DialogActions>
            </Dialog>
          </div>


          <div id="admin-settings">


            <div id="create-user">
              <Button variant="outlined" color="primary" className={classes.buttons} onClick={handleCreateUserOpen}>
                Create Users
          </Button>
              <Dialog open={createOpen} onClose={handleCreateUserClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Create User</DialogTitle>
                <DialogContent>
                  Please upload JSON file of employees you would like to add.
                <TextField
                    margin="dense"
                    id="employees-json"
                    type='file'
                    fullWidth
                  />

                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCreateUserClose}>
                    Cancel
        </Button>
                  <Button onClick={handleCreateUserClose} >
                    Save
        </Button>
                </DialogActions>
              </Dialog>
            </div>


            <div id="delete-user">
              <Button variant="outlined" color="secondary" className={classes.buttons} onClick={handleDeleteUserOpen}>
                Delete User
          </Button>
              <Dialog open={deleteOpen} onClose={handleDeleteUserClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Delete User</DialogTitle>
                <DialogContent>
                  <TextField
                    margin="dense"
                    id="company-ID"
                    label="Company ID"
                    type="number"
                    fullWidth
                  />
                  <TextField
                    margin="dense"
                    id="employee-id"
                    label="Employee ID"
                    type='number'
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteUserClose}>
                    Cancel
        </Button>
                  <Button onClick={handleDeleteUserClose} >
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
})

export default Settings;