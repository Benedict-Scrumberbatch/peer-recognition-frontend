Basic Settings component:

![Settings Component](../../../public/settingspage.png "Default Settings component")


```typescript jsx static 
const Settings = withStyles(styles)(({ classes }: SimpleProps) => {
  const triggerUseEffect = true; // changing the value of this varable will rerender the useEffect hook
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
  }, [triggerUseEffect])
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
```