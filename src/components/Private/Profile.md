Basic Profile page component:
```typescript jsx
<Profile />
```

```typescript jsx static
class Profile extends Component<Props> {
  constructor(props: any) {
    super(props)
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
              Recognitions Received: 32
            </Typography>
            <Typography> 
              Recognitions Given: 85
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
```