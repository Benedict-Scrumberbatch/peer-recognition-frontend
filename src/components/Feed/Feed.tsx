import React, { Component } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { fade, createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Comopnents
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

// Custom Components
// import Searchbar from './Searchbar';
import Post from './Post';
import Rockstar from './Rockstar';

import RecognitionService from '../../api/RecognitionService';

const styles = (theme: Theme) => createStyles({
  grow: {
    marginTop: theme.spacing(4)
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
});

interface Props extends WithStyles<typeof styles> { }

type PostProps = {
  postList: Array<object>
}

class Profile extends Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      postList: [{
        empTo: '',
        empFrom: '',
        msg: '',
        date: '',
        tags: [{}, {}],
      }, {}]
    }
  }

  componentDidMount() {
    const recognitionAPI = new RecognitionService();
    recognitionAPI.getFeed()
      .then((response: any) => {
        console.log(response);
        this.setState({
          postList: response
        })
      });
  }

  render() {
    const { classes } = this.props;
    
    return (
      <Container maxWidth="lg">
        <div className={classes.grow} />
        <Container maxWidth="md" className={classes.searchWrapper}>
          <div className={classes.searchWrapper}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

        </Container>
        <div className={classes.buttonList}>
          <Button variant="contained" className={classes.buttonItem}>{"Create a Post"}</Button>
          <Button variant="contained" className={classes.buttonItem}>{"See My Posts"}</Button>
        </div>
        <div className={classes.postList}>
          <div className={classes.postItem}>
            <Rockstar />
          </div>
          {this.state.postList.map((val: any, idx: number) => {
            // const { nameFrom, titleFrom, nameTo, titleTo, date } = val;
            return (
              <div key={idx} className={classes.postItem}>
                <Post postList = {this.state.postList}/>
              </div>
            )
          })}
        </div>
      </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Profile);