import React, { Component } from 'react';
// Routing
import { Redirect, Link } from 'react-router-dom';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Components
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// Material UI Lab Components
import Alert from '@material-ui/lab/Alert';
// utils
import AuthLoginService from '../api/AuthLoginService';
import auth from '../api/authHelper';

const styles = (theme: Theme) => createStyles({
  paper: {
    margin: theme.spacing(8, 5, 0, 5),
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
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

interface Props extends WithStyles<typeof styles> { }
type MyState = {
  redirect: Boolean,
  usernameFieldValue: string,
  passwordFieldValue: string,
  error: string
};

/**
 *  Component visible on the opening screen responsible for handling user login and authorization.
 */
class Login extends Component<Props, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirect: false,
      usernameFieldValue: "",
      passwordFieldValue: "",
      error: ""
    }
    // make sure the "this" variable keeps its scope
    this._handleUsernameFieldChange = this._handleUsernameFieldChange.bind(this);
    this._handlePasswordFieldChange = this._handlePasswordFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: any) {
    e.preventDefault(); // prevent default page refresh

    console.log(`username: ${this.state.usernameFieldValue}`)
    console.log(`password: ${this.state.passwordFieldValue}`)
    // {"username":"greg", "password":"password1"}
    /* postLogin('http://localhost:4200/auth/login', this.state.usernameFieldValue, this.state.passwordFieldValue)
      .then((data: any) => {
        console.log(data);
        this.setState({ redirect: true });
        auth.authenticate(data, () => {
          this.setState({ redirect: true });
        });
      })
      .catch(error => {
        // show error message
        console.log(error)
        this.setState({ error: error.message })
      }) */
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

export default withStyles(styles, { withTheme: true })(Login);