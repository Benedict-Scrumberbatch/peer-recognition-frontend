import React, { Component } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
import {Grid, Modal, Dialog} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import SearchBar from "material-ui-search-bar";
// Material UI Comopnents
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = (theme: Theme) => createStyles({
  buttons: {
    margin: theme.spacing(2, 0, 0, 0),
    float: "right"
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


type State = { open: boolean };
interface Props extends WithStyles<typeof styles>{ }

class Home extends Component<Props,State> {
  constructor(props: any) {
    super(props)
    this.state = {
        open : false
    }
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleOpen = () => {
    this.setState({
        open : true
    })
  };

  handleClose = () => {
    this.setState({
        open : false
    })
  };

  
  render() {
    const { classes } = this.props;
    
    return (
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div style={{padding:10}}>
        <Grid container direction="row" justify="flex-end" alignItems="flex-start" >
        <StyledButton onClick={this.handleOpen}>
            Create New Post
        </StyledButton>
        </Grid>
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
            style={{width: '25%'}}
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
    )
  }
}

export default withStyles(styles, { withTheme: true })(Home);  