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
import { Recognition } from '../../common/entity/recognition.entity';
import { Users } from '../../common/entity/users.entity';
import UserService from '../../api/UserService';
import { Tag } from '../../common/entity/tag.entity';
import { CircularProgress } from '@material-ui/core';
import RockstarService from '../../api/RockstarService';
import { ReturnRockstarDto } from '../../common/dto/rockstar-stats.dto';


const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

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

const Feed = withStyles(styles)(({ classes }: SimpleProps) => {
  const triggerUseEffect = true; // changing the value of this varable will rerender the useEffect hook
  const userApi = new UserService();
  const recApi = new RecognitionService();
  const rockstarApi = new RockstarService();
  const [showRockstar, setShowRockstar] = useState(true);
  const [postList, setPostList] = useState<Recognition[]>([]);
  const [nextPostUrl, setNextPostUrl] = useState<string>('');
  const [totalPostCount, setPostCount] = useState<number>(0);
  const [morePostBool, setPostBool] = useState<boolean>(true);
  const [nextUserUrl, setNextUserUrl] = useState<string>('');
  const initialrockstar = new ReturnRockstarDto()
  const [rockstar, setRockstar] = useState<ReturnRockstarDto>(initialrockstar);



  //Create Rec Consts
  const [userList, setUserList] = useState<Users[]>([]);
  const [userQuery, setUserQuery] = useState("");
  const [targetUser, setTargetUser] = useState<Users | null>(null);
  const [userSearchOpen, setUserSearchOpen] = useState(false);
  const [recMsg, setRecMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [tagSearchOpen, setTagSearchOpen] = useState(false);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const tagLoading = tagSearchOpen && tagOptions.length === 0;


  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }

  const handleUserPaging = () => {
    (async () => {
      const response = await userApi.searchUserNext(nextUserUrl);
      if (response.items.length > 0) {
        setUserList(userList.concat(response.items));
        setNextUserUrl(response.links.next);
      }
    })();
  }

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
    recApi.paginatedRecs().then(
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

  const handleCreateRec = async () => {
    try {
      if (targetUser && recMsg.length > 0 && selectedTags.length > 0) {
        const response = await recApi.createPost(targetUser, recMsg, selectedTags);
        handleClose();
      }
      else {
        alert("Please fill out all fields.");
      }
    } catch (e) {
      alert(`An Error Occured: ${e}`);
    }
  }

  useEffect(() => {
    let active = true;

    if (!tagLoading) {
      return undefined;
    }

    (async () => {
      const response = await recApi.getAllTags();

      if (active) {
        setTagOptions(response);
      }
    })();

    return () => {
      active = false;
    };
  }, [tagLoading]);

  useEffect(() => {
    let active = true;
    if (userSearchOpen) {
      (async () => {
        const response = await userApi.searchUsers(userQuery);

        if (active) {
          setUserList(response.items);
          setNextUserUrl(response.links.next);
        }
      })();
    }
    return () => {
      active = false;
    };
  }, [userQuery, userSearchOpen]);

  useEffect(() => {
    if (!userSearchOpen) {
      setUserList([]);
      setNextUserUrl('');
    }
  }, [userSearchOpen]);


  useEffect(() => {
    initPostList();
    rockstarApi.getRockstar().then((response) => {
      setRockstar(response)
    })
  }, [triggerUseEffect])

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
            onChange={(async (event: any) => {
                console.log('rec change')
                if (event.target.value === "") {
                  initPostList();
                  setShowRockstar(true);
                } else {
                  const response = await recApi.searchRecs(event.target.value);
                  setPostList(response.items);
                  setPostCount(response.meta.totalItems);
                  setNextPostUrl(response.links.next);
                  setShowRockstar(false);
                  if (response.links.next !== "") {
                    setPostBool(true);
                  } else {
                    setPostBool(false);
                  }
                }
              })
            }
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="md">
          <DialogTitle id="form-dialog-title">Create New Post</DialogTitle>
          <DialogContent>
            <Autocomplete
              id="user-search"
              size='small'
              open={userSearchOpen}
              onOpen={() => {
                setUserSearchOpen(true);
              }}
              onClose={() => {
                setUserSearchOpen(false);
              }}
              ListboxProps={{
                style: { maxHeight: 300, overflow: 'auto' },
                onScroll: (event: React.SyntheticEvent) => {
                  const listboxNode = event.currentTarget;
                  if (listboxNode.scrollTop + listboxNode.clientHeight === listboxNode.scrollHeight) {
                    handleUserPaging();
                  }
                }
              }}
              value={targetUser}
              onChange={(event: any, newValue: Users | null) => {
                setTargetUser(newValue);
              }}
              inputValue={userQuery}
              onInputChange={(event, newInputValue) => {
                setUserQuery(newInputValue);
              }}
              getOptionSelected={(userOption: Users, selected: Users) => userOption.employeeId === selected.employeeId}
              getOptionLabel={(userOption) => userOption.firstName + " " + userOption.lastName}
              options={userList}
              loading={false}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Find User"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              )}
            />
            <TextField
              autoFocus
              margin="dense"
              id="multiline-recognition"
              label="Type in recognition..."
              multiline
              rows={6}
              variant="outlined"
              onChange={e => setRecMsg(e.target.value)}
              fullWidth
            />
            <DialogContentText>
            </DialogContentText>
            <Autocomplete
              multiple
              id="tag-search"
              open={tagSearchOpen}
              onOpen={() => {
                setTagSearchOpen(true);
              }}
              onClose={() => {
                setTagSearchOpen(false);
              }}
              value={selectedTags}
              onChange={(event: any, newValues: Tag[]) => {
                setSelectedTags(newValues);
              }}
              getOptionSelected={(tagOption: Tag, selected: Tag) => tagOption.value === selected.value}
              getOptionLabel={(tagOption) => tagOption.value}
              options={tagOptions}
              loading={tagLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choose Company Values"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <Fragment>
                        {tagLoading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </Fragment>
                    ),
                  }}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <StyledButton onClick={handleClose}>
              Cancel
          </StyledButton>
            <StyledButton onClick={handleCreateRec}>
              Create Post
          </StyledButton>
          </DialogActions>
        </Dialog>
      </Container>
      <div className={classes.buttonList}>
        <StyledButton onClick={handleOpen} className={classes.buttonItem}>{"Create a Post"} </StyledButton>
      </div>
      <div className={classes.postList}>
        {showRockstar && rockstar.rockstar && <div className={classes.postItem}>
          <Rockstar rockstar={rockstar} />
        </div>} 
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
      </div>
    </Container>
  )
});

export default Feed;