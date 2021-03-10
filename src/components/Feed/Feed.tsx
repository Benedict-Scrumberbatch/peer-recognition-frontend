import React, { useState } from 'react';
// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
// Custom Components
import Searchbar from './Searchbar';
import Post from './Post';

const useStyles = makeStyles((theme) => ({
  grow: {
    marginTop: theme.spacing(4)
  },
  searchWrapper: {
    boxShadow: '0px 5px 0px #ccc, 5px 0px 0px #ccc, 0px 0px 5px #ccc',
    borderRadius: '25px',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  buttonList: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  buttonItem: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
    borderRadius: '20px',
  },
  postList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  postItem: {
    padding: theme.spacing(1)
  }
}));

export default function Feed() {
  const classes = useStyles();  
  const [postList, setPostList] = useState([
    {},
    {},
    {}
  ])

  return (
    <Container maxWidth="lg">
      <div className={classes.grow} />
      <Container maxWidth="md" className={classes.searchWrapper}>
        <Searchbar />
      </Container>
      <div className={classes.buttonList}>
        <Button variant="contained" className={classes.buttonItem}>{"Create a Post"}</Button>
        <Button variant="contained" className={classes.buttonItem}>{"See My Posts"}</Button>
      </div>
      <div className={classes.postList}>
        {postList.map((val, idx) => {
          // const { nameFrom, titleFrom, nameTo, titleTo, date } = val;
          return (
            <div className={classes.postItem}>
              <Post />
            </div>
          )
        })}
      </div>
    </Container>
  )
}