import React, { Component } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { fade, createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Comopnents
import TextField from '@material-ui/core/TextField';
import {Grid, Modal, Dialog} from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import SearchBar from "material-ui-search-bar";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

const StyledButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #00b327 30%, #53ff59 99%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 3px 2px rgba(155, 155, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },

})(Button);

interface Props extends WithStyles<typeof styles> { }

class Profile extends Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      postList: [],
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  async componentDidMount() {
    const recognitionAPI = new RecognitionService();
    const feed = await recognitionAPI.getFeed();
    this.setState({
      postList: feed
    });
  }
  handleOpen = () => {
    this.setState({
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

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
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
            <DialogTitle id="form-dialog-title">Create New Post</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Search for Employee Name
          </DialogContentText>
              <SearchBar
              />
              <TextField
                autoFocus
                margin="dense"
                id="multiline-recognition"
                label="Type in recognition..."
                multiline
                rows={6}
                variant="outlined"
                fullWidth
              />
              <DialogContentText>
                Core Values Shown
          </DialogContentText>
              <SearchBar
                style={{ width: '25%' }}
              />
            </DialogContent>
            <DialogActions>
              <StyledButton onClick={this.handleClose}>
                Cancel
          </StyledButton>
              <StyledButton onClick={this.handleClose} >
                Create Post
          </StyledButton>
            </DialogActions>
          </Dialog>
        </Container>
        <div className={classes.buttonList}>
          <StyledButton onClick={this.handleOpen} className={classes.buttonItem}>{"Create a Post"} </StyledButton>
          <StyledButton className={classes.buttonItem}>{"See My Posts"} </StyledButton>
        </div>
        <div className={classes.postList}>
          <div className={classes.postItem}>
            <Rockstar />
          </div>
          {this.state.postList.map((val: any, idx: number) => {
            // const { nameFrom, titleFrom, nameTo, titleTo, date } = val;
            return (
              <div key={idx} className={classes.postItem}>
                {typeof this.state.postList[idx] === undefined ? <div>Loading...</div> : <Post recognition = {this.state.postList[idx]}/>}
              </div>
            )
          })}
        </div>
      </Container>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Profile);