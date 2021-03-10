import React, { Component } from 'react';
// Material UI Styling
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
// Material UI Comopnents
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    paper: {
        margin: theme.spacing(2, 4, 0, 4),
        padding: theme.spacing(2),
        maxWidth: 750,
    },
    avatar: {
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

interface Props extends WithStyles<typeof styles>{ }

class Post extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <img className={classes.avatar} alt="complex" src="/static/images/grid/complex.jpg" />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                Standard license
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                Full resolution 1920x1080 • JPEG
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                ID: 1030114
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                    Remove
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">$19.00</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Post);