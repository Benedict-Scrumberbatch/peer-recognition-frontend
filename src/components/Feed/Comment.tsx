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
import PlaceholderProfileImg from '../../assets/img/kitten_placeholder.jpg';
import BackgroundStar from '../../assets/img/lime-green-star.png';
import { Recognition } from '../../common/entity/recognition.entity';
import { useHistory } from 'react-router-dom';
import RecognitionService from '../../api/RecognitionService';
import UserService from '../../api/UserService';
import { Users } from '../../common/entity/users.entity';
import { Comment } from '../../common/entity/comment.entity';



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
export default function CommentComponent(props: {comment: Comment}) {
  const recApi = new RecognitionService();
  const userApi = new UserService();

  const classes = useStyles();
  const initComment = props.comment;
  // console.log(initComment)
  const [comment, setComment] = useState(initComment);
  const [triggerPost, setPostTrigger] = useState(true);
  const [reload, setReload] = useState(true);
  const [reportMsg, setReportMsg] = useState('');
  const [userProfile, setProfile] = useState<Users>();
  const [profileUpdate, setProfileUpdate] = useState(true);



  const history = useHistory(); // React Router history hook


  const handleReport = async () => {
    try {
      if (reportMsg.length > 0) {
        const response = await recApi.createCommentReport(comment.commentID, reportMsg);
      }
      else {
        alert("Please fill out all fields.");
      }
    } catch (e) {
      alert(`An Error Occured: ${e}`);
    }
  }
  
  const handleLike = async (comment: Comment) => {
    try {
      const match = comment.reactions.find(react => react.employeeFrom.employeeId === userProfile.employeeId)
      if (match) {
        await recApi.deleteLike(match.reactionID);
      } else {
        await recApi.likeCommentRec(comment.commentID);
      }
      setReload(!reload)


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
    recApi.getComment(comment.commentID.toString()).then(response => {
      setComment(response);
      console.log(response)
    })
  }, [reload])

  return comment && (
    <Card className={classes.root}>
      <Box display="flex" flexDirection="row" style={{ marginTop: 8}}>
        <div>
          <img src={PlaceholderProfileImg} alt="profile" className={classes.profilePhoto} />
          <Typography variant="body2" color="textSecondary" style={{ marginLeft: 20 }}>
              {(new Date(comment.createdAt!)).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
        </div>
        <div>
          <CardContent>
            <Typography variant="h4" className={classes.themeColor} style={{ display: 'inline-block' }}>
              <Link href={`/profile/${comment.employeeFrom.employeeId}` } color="inherit" style={{ textDecoration: 'none' }}>{comment.employeeFrom.firstName} {comment.employeeFrom.lastName}</Link>
            </Typography>
    
            <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 8 }}>
              {comment.msg}
            </Typography>
            
            <Button onClick={() => handleLike(comment)}>
                    Like: {comment.reactions.length}
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
