Basic feed component:
 
``` typescript jsx
<Profile />
```

```typescript jsx static
class Profile extends Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      /** List containing all recognition posts */
      postList: [{}, {}, {}, {}],
      open: false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
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
                <Post />
              </div>
            )
          })}
        </div>
      </Container>
    )
  }
}
```

