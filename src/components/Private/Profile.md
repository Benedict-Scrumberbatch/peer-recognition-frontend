Basic Profile page component:
![Profile Component](../../../public/profilepage.png "Default Profile component")


```typescript jsx static 
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
});
```