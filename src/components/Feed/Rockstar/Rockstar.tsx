<<<<<<< HEAD:src/components/Feed/Rockstar.tsx
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import PlaceholderProfileImg from '../../assets/img/kitten_placeholder.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    border: '2px solid',
    borderColor: '#f39c12',
    borderRadius: '15xpx',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'right', 
    borderWidth: 4
  },
  profilePhoto: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: '50%',
    objectFit: 'cover',
    padding: 20,
  },
  wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center' 
  },
  tagStyle: {
      width: '70px',
      height : '25px',
      borderRadius: '15px'
  }
}));
 /** 
 *  Special post component that displays the rockstar employee of the month at the top of the feed timeline.
 * 
 * 
 * @public
 */
export default function RockstarCard() {
  const classes = useStyles();
  const PieChart = require("react-chartjs").Pie;
  return (
    <Card className={classes.root}>
      <Box display="flex" flexDirection="row" style={{ marginTop: 3}}>
        <div>
          <CardContent> 
            <Typography variant="h4" style = {{marginLeft : 15}}>
              Rockstar of the Month
            </Typography>
            <Typography variant="h5" style = {{marginLeft : 15, color: '#f39c12'}}>
              February
            </Typography> 
            <div className = {classes.wrapper}>
            <div>
            <div className = {classes.wrapper}>
            <div><img src={PlaceholderProfileImg} alt="profile photo" className={classes.profilePhoto} /> </div>
            <div>
            <div><Typography variant="h6" style={{ display: 'inline-block' }}>
              <Link href="#" color="inherit" style={{ textDecoration: 'none' }}>John Doe</Link>
            </Typography></div>
            <div><Typography variant="body2" color="textSecondary">
              Engineer at UKG
            </Typography></div>
            </div>
            </div>
            <div className={classes.wrapper} >
            <Box className={classes.tagStyle} style= {{backgroundColor: 'yellowgreen'}}>
              <div style= {{textAlign: 'center'}}> Value1 </div>
            </Box>
            &nbsp;
            <Box className={classes.tagStyle} style= {{backgroundColor: 'aqua'}}>
              <div style= {{textAlign: 'center'}}> Value2 </div>
            </Box>
            &nbsp;
            <Box className={classes.tagStyle} style= {{backgroundColor: 'pink'}}>
              <div style= {{textAlign: 'center'}}> Value3 </div>
            </Box>
            </div>
            </div>
            <div> <PieChart 
            data = {[
                {
                    value: 45,
                    color:"yellowgreen",
                    highlight: "#FF5A5E",
                    label: "Value1"
                },
                {
                    value: 35,
                    color: "aqua",
                    highlight: "#5AD3D1",
                    label: "Value2"
                },
                {
                    value: 20,
                    color: "pink",
                    highlight: "#FFC870",
                    label: "Value3"
                }
            ]}
            /></div>
            <div style={{position: 'relative', top: '-70px'}}>
            <div> <Typography variant="h5">
              Some Quotes:
            </Typography> </div>
            <div> 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in ex enim. Duis eu erat urna.</div>
            <div> 2. Nulla consequat, urna tincidunt mollis dapibus, 
                    lacus libero tincidunt erat, non varius sapien.</div>
            <div> 3. Fusce viverra blandit purus ac pellentesque. Nullam sed nisl erat.</div>
            </div>
            </div>
          </CardContent>
        </div>
      </Box>
    </Card>
  );
}
=======
// Material UI Styling
import { makeStyles } from '@material-ui/core/styles';
// Material UI Components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
// Assets
import PlaceholderProfileImg from '../../../assets/img/kitten_placeholder.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 900,
    border: '2px solid',
    borderColor: '#f39c12',
    borderRadius: '15xpx',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'right', 
    borderWidth: 4
  },
  profilePhoto: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: '50%',
    objectFit: 'cover',
    padding: 20,
  },
  wrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center' 
  },
  tagStyle: {
      width: '70px',
      height : '25px',
      borderRadius: '15px'
  }
}));

export default function RockstarCard() {
  const classes = useStyles();
  const PieChart = require("react-chartjs").Pie;
  return (
    <Card className={classes.root}>
      <Box display="flex" flexDirection="row" style={{ marginTop: 3}}>
        <div>
          <CardContent> 
            <Typography variant="h4" style = {{marginLeft : 15}}>
              Rockstar of the Month
            </Typography>
            <Typography variant="h5" style = {{marginLeft : 15, color: '#f39c12'}}>
              February
            </Typography> 
            <div className = {classes.wrapper}>
            <div>
            <div className = {classes.wrapper}>
            <div><img src={PlaceholderProfileImg} alt="profile photo" className={classes.profilePhoto} /> </div>
            <div>
            <div><Typography variant="h6" style={{ display: 'inline-block' }}>
              <Link href="#" color="inherit" style={{ textDecoration: 'none' }}>John Doe</Link>
            </Typography></div>
            <div><Typography variant="body2" color="textSecondary">
              Engineer at UKG
            </Typography></div>
            </div>
            </div>
            <div className={classes.wrapper} >
            <Box className={classes.tagStyle} style= {{backgroundColor: 'yellowgreen'}}>
              <div style= {{textAlign: 'center'}}> Value1 </div>
            </Box>
            &nbsp;
            <Box className={classes.tagStyle} style= {{backgroundColor: 'aqua'}}>
              <div style= {{textAlign: 'center'}}> Value2 </div>
            </Box>
            &nbsp;
            <Box className={classes.tagStyle} style= {{backgroundColor: 'pink'}}>
              <div style= {{textAlign: 'center'}}> Value3 </div>
            </Box>
            </div>
            </div>
            <div> <PieChart 
            data = {[
                {
                    value: 45,
                    color:"yellowgreen",
                    highlight: "#FF5A5E",
                    label: "Value1"
                },
                {
                    value: 35,
                    color: "aqua",
                    highlight: "#5AD3D1",
                    label: "Value2"
                },
                {
                    value: 20,
                    color: "pink",
                    highlight: "#FFC870",
                    label: "Value3"
                }
            ]}
            /></div>
            <div style={{position: 'relative', top: '-70px'}}>
            <div> <Typography variant="h5">
              Some Quotes:
            </Typography> </div>
            <div> 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in ex enim. Duis eu erat urna.</div>
            <div> 2. Nulla consequat, urna tincidunt mollis dapibus, 
                    lacus libero tincidunt erat, non varius sapien.</div>
            <div> 3. Fusce viverra blandit purus ac pellentesque. Nullam sed nisl erat.</div>
            </div>
            </div>
          </CardContent>
        </div>
      </Box>
    </Card>
  );
}
>>>>>>> master:src/components/Feed/Rockstar/Rockstar.tsx
