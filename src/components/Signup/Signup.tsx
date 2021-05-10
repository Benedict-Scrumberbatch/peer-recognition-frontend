import { useState } from 'react'
// Routing
import { Link, useHistory } from 'react-router-dom';
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
import AuthLoginService from '../../api/AuthLoginService';
// types
import { Tag } from '../../dtos/entity/tag.entity';
// custom components
import TagSelect from './TagSelect'

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

interface SimpleProps extends WithStyles<typeof styles> {
}

// const Header = withStyles(styles)(({ classes }: SimpleProps) => {
const Signup = withStyles(styles)(({ classes }: SimpleProps) => {
  const history = useHistory();
  const [error, setError] = useState("")
  const [name, setUsername] = useState("")
  const [tags, setTags] = useState<Tag[]>([
    { tagId: 1, value: 'Understanding' },
    { tagId: 2, value: 'Kind' },
    { tagId: 3, value: 'Diligent' },
    { tagId: 4, value: 'Sincere' }
  ])
  const [count, setCount] = useState(5)


  const handleUsernameChange = (e: any): void => {
    setUsername(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault(); // prevent default page refresh

    const loginAPI = new AuthLoginService();
    loginAPI.postCreateCompany(name, tags)
      .then((response) => {
        console.log(response);
        alert(`Success! Company, ${name}, was created`)
        history.push("/login");
      })
      .catch(error => {
        // show error message
        console.log(error)
        setError(error.message)
      })
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.wrapper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Company
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              autoFocus
              value={name}
              onChange={handleUsernameChange}
            />
            <TagSelect tags={tags} setTags={setTags} count={count} setCount={setCount}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Create Company
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login">
                  <Typography variant="body2">Forgot password?</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/login" >
                  <Typography variant="body2">Have an account? Log in</Typography>
                </Link>
              </Grid>
            </Grid>
          </form>
          {
            error === ""
              ? <></>
              :
              <Alert severity="error">ERROR: {error}</Alert>
          }
        </div>
      </Paper>
    </Container>
  )
});

export default Signup;