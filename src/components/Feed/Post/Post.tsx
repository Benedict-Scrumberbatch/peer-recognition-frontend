/*
  POST component
  component to recognize a person
*/

import React from 'react';
// Material UI Styling
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
// Material UI Components
import Link from '@material-ui/core/Link'; // replace with react-router link for in-app routing
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Assets
import PlaceholderProfileImg from '../../../assets/img/kitten_placeholder.jpg';
import BackgroundStar from '../../../assets/img/lime-green-star.png';
import { Recognition } from '../../../dtos/entity/recognition.entity';

import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { fade, createStyles, WithStyles, responsiveFontSizes } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    border: '2px solid',
    borderColor: green['A400'],
    borderRadius: '15xpx',
    backgroundImage: `url(${BackgroundStar})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'right', 
    width: '56.25rem',
  },
  searchWrapper: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.light, 0.03),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.light, 0.05),
    },
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100ch',
    },
  },
  profilePhoto: {
    width: '125px',
    height: '125px',
    borderRadius: '50%',
    objectFit: 'cover',
    padding: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  themeColor: {
    color: green['A400']
  },
  themeBold: {
    color: green['A400'],
    marginTop: 10,
  },
  buttons: {
    margin: theme.spacing(2, 1, 0, 0)
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(green['A400']),
    backgroundColor: green['A400'],
    '&:hover': {
      backgroundColor: green['A200'],
    },
  },
}))(Button);

export default function Post(props: {recognition: Recognition}) {
  const classes = useStyles();
  const post = props.recognition;
  
  return (
    <Card className={classes.root}>
      <Box display="flex" flexDirection="row" style={{ marginTop: 8}}>
        <div>
          <img src={PlaceholderProfileImg} alt="profile" className={classes.profilePhoto} />
          <Typography variant="body2" color="textSecondary" style={{ marginLeft: 20 }}>
              {(new Date(post.createdAt!)).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
        </div>
        <div>
          <CardContent>
            <Typography variant="h4" className={classes.themeColor} style={{ display: 'inline-block' }}>
              <Link href="#" color="inherit" style={{ textDecoration: 'none' }}>{post.empTo.firstName} {post.empTo.lastName}</Link>
            </Typography>
            <Typography variant="h6" color="textSecondary" style={{ display: 'inline-block' }}>
              &nbsp;has been recognized by&nbsp;
              <Link href="#" color="inherit" style={{ textDecoration: 'none' }}>{post.empFrom.firstName} {post.empFrom.lastName}</Link>
            </Typography>
            
            <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 8 }}>
              {post.msg}
            </Typography>
            

    

            <div> <Typography variant="h5" color="textSecondary" component="p" style={{ marginTop: 12 }}>
              Comments:
            </Typography> </div>
            <Paper style={{ padding: "40px 20px" }}>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="profile photo" src={PlaceholderProfileImg} />                
                </Grid>
                <Grid item>
                  <h4 style={{ margin: 0, textAlign: "left" }}>John Doe</h4>
                  <p style={{ textAlign: "left" }}>
                    LOL IKR?{" "}
                  </p>  
                </Grid>
                <Grid item>
                  <p style={{ margin: 0, textAlign: "left", color: "gray" }}>
                    posted {(new Date(post.createdAt!)).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </Grid>
              </Grid>

              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="profile photo" src={PlaceholderProfileImg} />                
                </Grid>
                <Grid item>
                  <h4 style={{ margin: 0, textAlign: "left" }}>Chad Doe</h4>
                  <p style={{ textAlign: "left" }}>
                    Yee yeet.{" "}
                  </p>  
                </Grid>
                <Grid item>
                  <p style={{ margin: 0, textAlign: "left", color: "gray" }}>
                    posted {(new Date(post.createdAt!)).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </Grid>
              </Grid>
            </Paper>
            <div className={classes.searchWrapper}>
              <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreateIcon />
                  </InputAdornment>
                ),
              }}
              autoFocus
              margin="dense"
              id="multiline-recognition"
              label="Write your comment..."
              multiline
              rows={2}
              variant="outlined"
              // onChange={e => setRecMsg(e.target.value)}
              fullWidth
            />
            </div>



            {post.tags.map((tag, idx) => {
              return (
                <ColorButton key={idx} variant="contained" color="primary" className={classes.buttons} disableElevation>
                  {tag.value}
                </ColorButton>
              )
            })}
          </CardContent>
        </div>
      </Box>
    </Card>
  );
}
