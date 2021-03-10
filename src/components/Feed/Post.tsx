// POST component
// component to recognize a person
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import PlaceholderProfileImg from '../../assets/img/kitten_placeholder.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    borderStyle: "solid",
    borderColor: "black",
    borderRadius: '25px'
  },
  profilePhoto: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
    padding: 10,
    marginRight: 5
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
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box display="flex" flexDirection="row">
        <div>
          <img src={PlaceholderProfileImg} alt="profile photo" className={classes.profilePhoto} />
        </div>
        <div>
          <Typography variant="h5">
            JOHN DOE
          </Typography>
          <Typography variant="subtitle1">
            Engineer at UKG
          </Typography>
          <Typography variant="body2">
            September 14, 2016
          </Typography>
        </div>
      </Box>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </CardContent>
    </Card>
  );
}
