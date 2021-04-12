Basic Settings component:
```typescript jsx
<Settings />
```

```typescript jsx static
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
```