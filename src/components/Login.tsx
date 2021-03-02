import React, { Component } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Comopnents
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// utils
import { postLogin } from '../api/postLogin';

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
  usernameFieldValue: string,
  passwordFieldValue: string
};

class Login extends Component<Props, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      usernameFieldValue: "",
      passwordFieldValue: ""
    }
    // make sure the "this" variable keeps its scope
    this._handleUsernameFieldChange = this._handleUsernameFieldChange.bind(this);
    this._handlePasswordFieldChange = this._handlePasswordFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log(`username: ${this.state.usernameFieldValue}`)
    console.log(`password: ${this.state.passwordFieldValue}`)
    // postLogin('http://localhost:3000/login', this.state.usernameFieldValue, this.state.passwordFieldValue)
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

  render() {
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
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
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
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                LOG IN
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Paper>
      </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Login);