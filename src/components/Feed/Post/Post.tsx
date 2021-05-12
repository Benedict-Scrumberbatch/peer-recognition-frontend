/*
  POST component
  component to recognize a person
*/

// Material UI Styling
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';

// Material UI Components
import { InputAdornment} from '@material-ui/core';

import Link from '@material-ui/core/Link'; // replace with react-router link for in-app routing
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// Assets
import PlaceholderProfileImg from '../../../assets/img/kitten_placeholder.jpg';
import BackgroundStar from '../../../assets/img/lime-green-star.png';
import { Recognition } from '../../../common/entity/recognition.entity';
import { useHistory } from 'react-router-dom';
import RecognitionService from '../../../api/RecognitionService';
import UserService from '../../../api/UserService';
import { Users } from '../../../common/entity/users.entity';


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



/**
 * Post component that shows a single recognition on the timeline.
 * @param props recognition 
 * @returns 
 */
export default function Post(props: {recognition: Recognition}) {
  const recApi = new RecognitionService();
  const userApi = new UserService();

  const classes = useStyles();
  const initPost = props.recognition;
  console.log(initPost)
  const [post, setPost] = useState(initPost);
  const [triggerPost, setPostTrigger] = useState(true);
  const [reportMsg, setReportMsg] = useState('');
  const [userProfile, setProfile] = useState<Users>();
  const [profileUpdate, setProfileUpdate] = useState(true);



  const history = useHistory(); // React Router history hook


  const handleReport = async () => {
    try {
      if (reportMsg.length > 0) {
        const response = await recApi.createReport(post.recId, reportMsg);
      }
      else {
        alert("Please fill out all fields.");
      }
    } catch (e) {
      alert(`An Error Occured: ${e}`);
    }
  }
  
  const handleLike = async () => {
    try {
      console.log(post)
      const match = post.reactions.find(react => react.employeeFrom.employeeId === userProfile.employeeId)
      console.log(match)
      if (match) {
        await recApi.deleteLike(match.reactionID);
      } else {
        await recApi.likeRec(post.recId);
      }
      setPostTrigger(!triggerPost)


    } catch (e) {
      alert(`An Error Occured: ${e}`);
    }
  }
  
  useEffect(() => {
    userApi.getUserProfile().then(response => {
      setProfile(response)
    })
  }, [profileUpdate])

  useEffect(() => {
    recApi.getRec(post.recId.toString()).then(response => {
      console.log(response)
      setPost(response);
    })
  }, [triggerPost])

  return (
    <Card className={classes.root} onClick={(event: any)=> {history.push(`/recognition/${post.recId}`)}}>
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
              <Link href={`/profile/${post.empTo.employeeId}` } color="inherit" style={{ textDecoration: 'none' }}>{post.empTo.firstName} {post.empTo.lastName}</Link>
            </Typography>
            <Typography variant="h6" color="textSecondary" style={{ display: 'inline-block' }}>
              &nbsp;has been recognized by&nbsp;
              <Link href={`/profile/${post.empFrom.employeeId}` } color="inherit" style={{ textDecoration: 'none' }}>{post.empFrom.firstName} {post.empFrom.lastName}</Link>
            </Typography>
            
            <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 8 }}>
              {post.msg}
            </Typography>
            {post.tags.map((tag, idx) => {
              return (
                <ColorButton key={idx} variant="contained" color="primary" className={classes.buttons} disableElevation>
                  {tag.value}
                </ColorButton>
              )
            })}
            <Button onClick={handleLike}>
              Like: {post.reactions.length}
            </Button>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CreateIcon />
                  </InputAdornment>
                ),
              }}
              value={reportMsg}
              autoFocus
              margin="dense"
              id="multiline-comment"
              label="Write your comment..."
              multiline
              rows={2}
              variant="outlined"
              onChange={e => setReportMsg(e.target.value)}
              fullWidth
              />
              <br></br>
            <Button onClick={handleReport}>
              Enter Report
            </Button>
          </CardContent>
        </div>
      </Box>
    </Card>
  );
}
