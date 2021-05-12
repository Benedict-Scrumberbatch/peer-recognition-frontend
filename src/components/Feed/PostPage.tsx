import React, { useState, useEffect, Fragment } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { fade, createStyles, withStyles, WithStyles, responsiveFontSizes } from "@material-ui/core/styles";
// Material UI Comopnents
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import PlaceholderProfileImg from '../../assets/img/kitten_placeholder.jpg';
import CreateIcon from '@material-ui/icons/Create';
import SearchBar from "material-ui-search-bar";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import InfiniteScroll from 'react-infinite-scroll-component';
// Custom Components
import Post from './Post';
import Rockstar from './Rockstar';
// Services
import RecognitionService from '../../api/RecognitionService';
import { Recognition } from '../../common/entity/recognition.entity';
import { Users } from '../../common/entity/users.entity';
import UserService from '../../api/UserService';
import { Tag } from '../../common/entity/tag.entity';
import { Avatar, CircularProgress, Grid, InputAdornment, Link, Paper, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';



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


interface SimpleProps extends WithStyles<typeof styles> {
  foo: number
}
/**
 * Timeline feed visible on the feed tab containing all the recognition posts in the form of a list.
 * 
 * @public
 */

 interface ParamTypes {
  id: string
}


const PostPage = withStyles(styles)(({ classes }: SimpleProps) => {
  let triggerUseEffect = true; // changing the value of this varable will rerender the useEffect hook
  const params = useParams<ParamTypes>();
  const initialPost: Recognition = new Recognition();
  const [post, setPost] = useState(initialPost);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const [commentMsg, setcommentMsg] = useState("");
  const recApi = new RecognitionService();
  const handleCreateComment = async () => {
    try {
      if (commentMsg.length > 0) {
        const response = await recApi.createComment(post.recId, commentMsg);
        triggerUseEffect = !triggerUseEffect
  handleClose();    }
      else {
        alert("Please fill out all fields.");
      }
    } catch (e) {
      alert(`An Error Occured: ${e}`);
    }
  }


  //Create Rec Consts
  const [userCommemt, setUserComment] = useState("");



  useEffect(() => {
    const recognitionAPI = new RecognitionService();
    recognitionAPI.getRec(params.id).then(
      (rec: Recognition) => {console.log(rec); setPost(rec);}
    );
  }, [triggerUseEffect])

  return (
    <Container maxWidth="lg">
      <div className={classes.grow} />
      <div className={classes.postList}>
   
        <div className={classes.postItem}>
              {!post.recId ? <div>Loading...</div> : <Post recognition={post} />}
        </div>
        
      </div>

      <Container>
      <div> 
      {!post.recId ? <div>Loading...</div> : <div><div> <Typography variant="h5" color="textSecondary" component="p" style={{ marginTop: 12 }}>
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
              id="multiline-comment"
              label="Write your comment..."
              multiline
              rows={2}
              variant="outlined"
              onChange={e => setcommentMsg(e.target.value)}
              fullWidth
              />
            </div>
            <StyledButton onClick={handleCreateComment}>
              Enter Comment
            </StyledButton>
              <br></br>
              Comments:
            </Typography> </div>
            <Paper style={{ padding: "40px 20px" }}>
              {post.comments.map((comment, idx)=> {
              return (
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                  <Avatar alt="profile photo" src={PlaceholderProfileImg} />                
                </Grid>
                <Grid item>
                  <Link href={`/profile/${comment.employeeFrom.employeeId}` } color="inherit" style={{ textDecoration: 'none' }}>{comment.employeeFrom.firstName} {comment.employeeFrom.lastName}</Link>
                  {/* <h4 style={{ margin: 0, textAlign: "left" }}>&nbsb;</h4> */}
                  <p style={{ textAlign: "left" }}>
                    {comment.msg}
                  </p>  
                </Grid>
                <Grid item>
                  <p style={{ margin: 0, textAlign: "left", color: "gray" }}>
                    posted {(new Date(comment.createdAt!)).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </Grid>
              </Grid>
              )})}

            </Paper>

</div>}
      </div>
      </Container>
    </Container>
  )
});

export default PostPage;