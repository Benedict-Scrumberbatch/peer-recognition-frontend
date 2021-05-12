import { useState, useEffect } from 'react';
// Material UI Styling
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Post from '../Feed/Post';
// Material UI Comopnents
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import InfiniteScroll from 'react-infinite-scroll-component';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
// Services
import UserService from '../../api/UserService';
// Assets
import PlaceholderProfileImg from '../../assets/img/kitten_placeholder.jpg';
// Types
import { UserStats } from "../../common/interface/userstats.interface";
import { TagStats } from '../../common/entity/tagstats.entity';
import { useParams } from 'react-router-dom';
import { Users } from '../../common/entity/users.entity';
import { Recognition } from '../../common/entity/recognition.entity';
import RecognitionService from '../../api/RecognitionService';
import Grid from '@material-ui/core/Grid';
import { sizing } from '@material-ui/system';
import { Box } from '@material-ui/core';
import { flexbox } from '@material-ui/system';

const styles = (theme: Theme) => createStyles({
  paper: {
    margin: theme.spacing(2, 0, 0, 0),
    padding: theme.spacing(3, 4, 3, 2),
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  profilePicLink: {
    color: "#808080"
  },
  statistics: {
    margin: theme.spacing(2, 0, 0, 0)
  },
  buttons: {
    margin: theme.spacing(2, 0, 0, 0)
  },
  tagStyles: {
    textAlign: 'center'
  },
  postItem: {
    padding: theme.spacing(1)
  }
});

interface SimpleProps extends WithStyles<typeof styles> {
}

interface ParamTypes {
  id: string
}

const Profile = withStyles(styles)(({ classes }: SimpleProps) => {
  const triggerUseEffect = true; // changing the value of this varable will rerender the useEffect hook
  const params = useParams<ParamTypes>();
  const recApi = new RecognitionService();

  // HOOKS
  const initialTagStats: TagStats[] = []
  const initialStats: UserStats = {
    numRecsReceived: 0,
    numRecsSent: 0,
    tagStats: initialTagStats
  }
  const initialUser: Users = new Users();
  const [stats, setStats] = useState(initialStats);
  const [user, setUser] = useState(initialUser);
  const [postList, setPostList] = useState<Recognition[]>([]);
  const [nextPostUrl, setNextPostUrl] = useState<string>('');
  const [totalPostCount, setPostCount] = useState<number>(0);
  const [morePostBool, setPostBool] = useState<boolean>(true);

  const handleFeedPaging = () => {
    (async () => {
      console.log('paging');
      console.log(nextPostUrl);
      const response = await recApi.searchRecsNext(nextPostUrl);
      console.log(response)
      if (response.items.length > 0) {
        setPostList(postList.concat(response.items));
        setPostCount(response.meta.totalItems);
        if (response.links.next !== "") {
          setNextPostUrl(response.links.next);
        } else {
          setPostBool(false);
        }      }
    })();
  }

  const initPostList = () => {
    console.log('init post');
    setPostBool(false);
    recApi.employeeRecs(params.id).then(
      response => {
        console.log(response);
        setPostList(response.items);
        setPostCount(response.meta.totalItems);
        setNextPostUrl(response.links.next);
        if (response.links.next !== "") {
          setPostBool(true);
        } else {
          setPostBool(false);
        }
      }
    );
  }

  // API CALL (called every time data is updated)
  useEffect(() => {
    const userStatsAPI = new UserService();
    userStatsAPI.getUserId(params.id)
    .then((user: Users) => {
      setUser(user);
    })
    .catch((err) => {
      alert("No such profile");
      console.log("User error");
    })
    initPostList();
    userStatsAPI.getStats(params.id)
    .then((stats: UserStats) => {
      setStats(stats);
    })
    .catch((err) => {
      alert("No such profile");
      console.log("Profile request error");
    })
  }, [triggerUseEffect])
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Box width = "100%" display="flex" justifyContent="center">
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.wrapper}>
          <Avatar alt="profile photo" src={PlaceholderProfileImg} className={classes.avatar} />
          <Typography component="h1" variant="h4">
            {user.firstName} {user.lastName}
            </Typography>
          <Typography className={classes.statistics}>
            Recognitions Received: {stats.numRecsReceived}
          </Typography>
          <Typography>
            Recognitions Given: {stats.numRecsSent}
          </Typography>
          <br></br>
          <Typography className={classes.tagStyles}>
            Values Received: {
              stats.tagStats.map((val: TagStats, idx: number) => {
                return (
                  <Typography key={idx} >
                    {val.tag.value}: Recieved: {val.countReceived}, Sent: {val.countSent}
                  </Typography>
                )
              })
            }
          </Typography>
        </div>
      </Paper>
      </Box>
      <Container>
        <Box width="100%" justifyContent="center">
      <InfiniteScroll
        dataLength={totalPostCount} //This is important field to render the next data
        next={handleFeedPaging}
        scrollableTarget="content-scroll"
        hasMore={morePostBool}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
      {postList.map((val, idx) => {
          // const { nameFrom, titleFrom, nameTo, titleTo, date } = val;
          return (
            <div key={idx} className={classes.postItem}>
              {typeof postList[idx] === undefined ? <div>Loading...</div> : <Post recognition={postList[idx]} />}
            </div>
          )
        })}    
        </InfiniteScroll>
        </Box>
      </Container>
    </Container>
  )
});

export default Profile;