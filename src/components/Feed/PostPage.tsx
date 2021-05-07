import { useState, useEffect, Fragment } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { fade, createStyles, withStyles, WithStyles, responsiveFontSizes } from "@material-ui/core/styles";
// Material UI Comopnents
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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
import { Recognition } from '../../dtos/entity/recognition.entity';
import { Users } from '../../dtos/entity/users.entity';
import UserService from '../../api/UserService';
import { Tag } from '../../dtos/entity/tag.entity';
import { CircularProgress } from '@material-ui/core';
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

  //Create Rec Consts
  const [userCommemt, setUserComment] = useState("");


  const handleCreateComment = async () => {
    // send the comment, then reload the data once sent
    triggerUseEffect = !triggerUseEffect
  }


  useEffect(() => {
    const recognitionAPI = new RecognitionService();
    recognitionAPI.getRec(params.id).then(
      (rec: Recognition) => {setPost(rec);}
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
    </Container>
  )
});

export default PostPage;