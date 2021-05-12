Basic Login component:

![Login Component](/../../public/login.png "Default Login component")


```typescript jsx static 
class Login extends Component<Props, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirect: false,
      usernameFieldValue: "",
      passwordFieldValue: "",
      error: ""
    }
    this._handleUsernameFieldChange = this._handleUsernameFieldChange.bind(this);
    this._handlePasswordFieldChange = this._handlePasswordFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault(); // prevent default page refresh
      const loginAPI = new AuthLoginService();
      loginAPI.postLogin(this.state.usernameFieldValue, this.state.passwordFieldValue)
        .then((response: any) => {
          auth.authenticate(response, () => { this.setState({ redirect: true }); });
        })
        .catch(error => {
          // show error message
          console.log(error)
          this.setState({ error: error.message })
        })
  }
 _handleUsernameFieldChange(e: any): void {
    this.setState({
      usernameFieldValue: e.target.value
    });
  }
  _handlePasswordFieldChange(e: any): void {
    this.setState({
      passwordFieldValue: e.target.value
    });
  }
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    if (this.state.redirect || auth.isAuthenticated()) {
      return <Redirect to='/profile' />;
    }

    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Paper elevation={3} className={classes.paper}>
          <div className={classes.wrapper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.usernameFieldValue}
                onChange={this._handleUsernameFieldChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.passwordFieldValue}
                onChange={this._handlePasswordFieldChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
              >
                LOG IN
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/login">
                    <Typography variant="body2">Forgot password?</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" >
                    <Typography variant="body2">Don't have an account? Sign Up</Typography>
                  </Link>
                </Grid>
              </Grid>
            </form>
            {
              this.state.error === ""
                ? <></>
                :
                <Alert severity="error">ERROR: {this.state.error}</Alert>
            }
          </div>
        </Paper>
      </Container>
    )
  }
}
```