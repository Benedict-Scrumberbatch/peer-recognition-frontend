// POST component
// component to recognize a person

import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';

import Box from '@material-ui/core/Box';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green, red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import PlaceholderProfileImg from '../../assets/img/kitten_placeholder.jpg';
import BackgroundStar from '../../assets/img/lime-green-star.png';

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

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box display="flex" flexDirection="row" style={{ marginTop: 8}}>
        <div>
          <img src={PlaceholderProfileImg} alt="profile" className={classes.profilePhoto} />
          <Typography variant="body2" color="textSecondary" style={{ marginLeft: 20 }}>
              September 14, 2016
          </Typography>
        </div>
        <div>
          <CardContent>
            <Typography variant="h4" className={classes.themeColor} style={{ display: 'inline-block' }}>
              <Link href="#" color="inherit" style={{ textDecoration: 'none' }}>John Doe</Link>
            </Typography>
            <Typography variant="h6" color="textSecondary" style={{ display: 'inline-block' }}>
              &nbsp;has been recognized by&nbsp;
              <Link href="#" color="inherit" style={{ textDecoration: 'none' }}>Jane Doe</Link>
            </Typography>
            
            <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 8 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              TEAMWORK - 2
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              LEADERSHIP - 65
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              ORGANIZATION - 11
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              COMMUNICATION - 1
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              CRITICAL THINKING - 8
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              POSITIVE ATTITUDE - 391
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              WORK ETHIC - 53
            </ColorButton>
          </CardContent>
        </div>
      </Box>
    </Card>
  );
}
