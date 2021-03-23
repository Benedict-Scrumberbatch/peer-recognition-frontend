import React, { Component } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Comopnents
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
// Custom Components
import Searchbar from './Searchbar';
import Post from './Post';
import Rockstar from './Rockstar';

const styles = (theme: Theme) => createStyles({
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
});

interface Props extends WithStyles<typeof styles>{ }

class Profile extends Component<Props, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      postList: [{}, {}, {}, {}]
    }
  }

  render() {
    const { classes } = this.props;
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

export default withStyles(styles, { withTheme: true })(Profile);  