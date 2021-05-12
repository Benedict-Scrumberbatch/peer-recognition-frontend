import React, { useState, useEffect } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Comopnents
import Link from '@material-ui/core/Link'; // replace with react-router-dom link for in-app routing
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import UserService from '../../api/UserService';

import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Services
import SettingsService from '../../api/SettingsService';
// Assets
import PlaceholderProfileImg from '../../assets/img/kitten_placeholder.jpg';
import { Users } from '../../dtos/entity/users.entity';
import { settings } from 'cluster';
import { EditLoginDto } from '../../dtos/dto/edit-login.dto';
import { Login } from '../../dtos/entity/login.entity';
import AuthLoginService from '../../api/AuthLoginService';
import auth from '../../api/authHelper';
import { Autocomplete } from '@material-ui/lab';
import { Role } from '../../dtos/enum/role.enum';

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
  let triggerUseEffect = true; // changing the value of this varable will rerender the useEffect hook
  const userApi = new UserService();

  const [contactOpen, setContactOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [createUserFile, setCreateUserFile] = useState('');
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
  const [currUser, setCurrUser] = useState<Users>(new Users());
  const [email, setEmail] = useState('');
  // const [settingsDto, setSettingsDto] = useState<EditLoginDto>(new EditLoginDto());
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordVerify, setNewPasswordVerify] = useState('');
  const [userSearchOpen, setUserSearchOpen] = useState(false);
  const [userQuery, setUserQuery] = useState("");
  const [targetUser, setTargetUser] = useState<Users | null>(null);
  const [userList, setUserList] = useState<Users[]>([]);
  const [nextUserUrl, setNextUserUrl] = useState<string>('');
  // const [userRole, setUserRole] = useState<Role>(Role.Employee);


  useEffect(() => {

    (async () => {
      console.log('RUNNING');
      const userAPI = new UserService();
      const user = await userAPI.getUserProfile();
      setCurrUser(user);


      const temp_email = await userAPI.getEmail();
      setEmail(temp_email.email);
      console.log(email);
    })();


    // not a real endpoint
    // settingsAPI.getSettings()
    //   .then((response) => {
    //     setCreateUsers(response)
    //   });
  }, [triggerUseEffect])

  const handleContactOpen = () => setContactOpen(true)
  const handleContactClose = () => {
    setContactOpen(false);
    handleClearSettings();
  }
  const handlePasswordOpen = () => setPasswordOpen(true)
  const handlePasswordClose = () => {
    setPasswordOpen(false);
    handleClearSettings();
  }
  const handleDeleteUserOpen = () => setDeleteOpen(true)
  const handleDeleteUserClose = () => {
    setTargetUser(null);
    setDeleteOpen(false)
  }
  const handleCreateUserOpen = () => setCreateOpen(true)
  const handleCreateUserClose = () => {
    setCreateOpen(false);
    setCreateUserFile('');
  }

  const handleClearSettings = () => {
    setNewEmail('');
    setNewPassword('');
    setPassword('');
    setNewPasswordVerify('');
  }

  const handleUserPaging = () => {
    (async () => {
      const response = await userApi.searchUserNext(nextUserUrl);
      if (response.items.length > 0) {
        setUserList(userList.concat(response.items));
        setNextUserUrl(response.links.next);
      }
    })();
  }

  const handleChangeContact = async () => {
    let edits = new Login();
    if (!newEmail || !password) {
      alert("Please fill out all required fields");
      return;
    }
    edits.email = newEmail;
    await handleChangeSettings(edits, newEmail, password);
  }

  const handleChangePassword = async () => {
    let edits = new Login();
    if (!password || !newPassword || !newPasswordVerify) {
      alert("Please fill out all required fields");
      return;
    }
    if (newPassword !== newPasswordVerify) {
      alert("Passwords don't match");
      return;
    }
    edits.password = newPassword;
    handleChangeSettings(edits, email, newPassword);
  }

  const handleChangeSettings = async (edits: Login, username: string, pass: string) => {
    try {
      const settingsService = new SettingsService();
      const settingsDto: EditLoginDto = {
        username: email,
        password: password,
        newDetails: edits
      };
      console.log(settingsDto);
      await settingsService.changeLogin(settingsDto);
      const loginAPI = new AuthLoginService();
      const response = await loginAPI.postLogin(username, pass);
      auth.authenticate(response, () => { });
      window.location.reload();
    } catch (ex) {
      if (ex.response) {
        if (ex.response.status === 401) {
          alert("Password is incorrect.");
        }
        else {
          alert("An error occurred");
        }
      }
      else {
        alert(ex);
      }
    }
  }


  useEffect(() => {
    let active = true;
    if (userSearchOpen) {
      (async () => {
        const response = await userApi.searchUsers(userQuery);

        if (active) {
          setUserList(response.items);
          setNextUserUrl(response.links.next);
        }
      })();
    }
    return () => {
      active = false;
    };
  }, [userQuery, userSearchOpen]);

  useEffect(() => {
    if (!userSearchOpen) {
      setUserList([]);
      setNextUserUrl('');
    }
  }, [userSearchOpen]);


  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.wrapper}>
          <Avatar alt="profile photo" src={PlaceholderProfileImg} className={classes.avatar} />
          <Typography component="h1" variant="h4">
            {currUser.firstName} {currUser.lastName}
          </Typography>
          <Typography>
            <Link href="#" className={classes.profilePicLink}>Change profile picture</Link>
          </Typography>
          <Typography className={classes.statistics}>
            Email: {email}
          </Typography>

          <div id="edit-contact-info">
            <Button variant="outlined" color="primary" className={classes.buttons} onClick={handleContactOpen}>
              Edit Contact Info
          </Button>
            <Dialog open={contactOpen} onClose={handleContactClose} aria-labelledby="form-dialog-title" >
              <DialogTitle id="form-dialog-title">Change Contact Info</DialogTitle>
              <DialogContent>
                <TextField disabled id="old-email" label="Old-Email" defaultValue={email} fullWidth />
                <TextField
                  margin="dense"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  onChange={(event: any) => {
                    setPassword(event.target.value);
                  }}
                  required
                />
                <TextField
                  margin="dense"
                  id="new-email"
                  label="New email"
                  type="email"
                  fullWidth
                  onChange={(event: any) => {
                    setNewEmail(event.target.value);
                  }}
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleContactClose}>
                  Cancel
        </Button>
                <Button onClick={handleChangeContact}>
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
                  onChange={(event: any) => {
                    setPassword(event.target.value);
                  }}
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  id="new-password"
                  label="New Password"
                  type='password'
                  onChange={(event: any) => {
                    setNewPassword(event.target.value);
                  }}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  id="re-enter-new-password"
                  label="Re-enter New Password"
                  type='password'
                  onChange={(event: any) => {
                    setNewPasswordVerify(event.target.value);
                  }}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handlePasswordClose}>
                  Cancel
        </Button>
                <Button onClick={handleChangePassword} >
                  Save
        </Button>
              </DialogActions>
            </Dialog>
          </div>

          <div id="admin-settings" hidden={currUser.role === Role.Admin ? false: true}>
            <div id="create-user">
              <Button variant="outlined" color="primary" className={classes.buttons} onClick={handleCreateUserOpen}>
                Create Users
          </Button>
              <Dialog open={createOpen} onClose={handleCreateUserClose} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title">Create User</DialogTitle>
                <DialogContent>
                  Please upload JSON file of employees you would like to add.
                <TextField
                    onChange={(event: any) => {
                      console.log(event);
                      setCreateUserFile(event.target.files[0]);
                    }}
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
                  <Button onClick={(async (event) => {
                    try {
                      console.log('saving');
                      console.log(new Date())
                      await userApi.uploadJson(createUserFile);
                      console.log(new Date())
                      console.log('uploaded')
                      handleCreateUserClose();
                      alert("Users created successfully!");
                    } catch (ex) {
                      alert(ex);
                    }
                  })}  >
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
                  <Autocomplete
                    fullWidth
                    id="user-search"
                    open={userSearchOpen}
                    onOpen={() => {
                      setUserSearchOpen(true);
                    }}
                    onClose={() => {
                      setUserSearchOpen(false);
                    }}
                    ListboxProps={{
                      style: { maxHeight: 300, overflow: 'auto' },
                      onScroll: (event: React.SyntheticEvent) => {
                        const listboxNode = event.currentTarget;
                        if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
                          handleUserPaging();
                        }
                      }
                    }}
                    value={targetUser}
                    onChange={(event: any, newValue: Users | null) => {
                      setTargetUser(newValue);
                    }}
                    inputValue={userQuery}
                    onInputChange={(event, newInputValue) => {
                      setUserQuery(newInputValue);
                    }}
                    getOptionSelected={(userOption: Users, selected: Users) => userOption.employeeId === selected.employeeId}
                    getOptionLabel={(userOption) => userOption.firstName + " " + userOption.lastName}
                    options={userList}
                    loading={false}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Find User"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                        }}
                      />
                    )}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteUserClose}>
                    Cancel
        </Button>
                  <Button onClick={(async () => {
                    try {
                      if (targetUser && targetUser.employeeId !== undefined) {
                        await userApi.deleteUser(targetUser.employeeId);
                        alert("User has been deleted.");
                        handleDeleteUserClose();
                      }
                      else alert("please select a user")
                    } catch (ex) {
                      alert(ex);
                    }
                  })}>
                    Save
        </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>

        </div>
      </Paper>
    </Container >
  );
});

export default Settings;