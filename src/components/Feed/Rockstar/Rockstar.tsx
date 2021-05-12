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
import { Pie } from 'react-chartjs-2';


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
 * Special post component that displays the Rockstar of the Month: i.e - the employee who received the most recognitions in the past  
 * month.
 * @returns 
 */
export default function RockstarCard() {
  const classes = useStyles();
  const chartColors = [
    "#336699",
    "#99CCFF",
    "#999933",
    "#666699",
    "#CC9933",
    "#006666",
    "#3399FF",
    "#993300",
    "#CCCC99",
    "#666666",
    "#FFCC66",
    "#6699CC",
    "#663366",
    "#9999CC",
    "#CCCCCC",
    "#669999",
    "#CCCC66",
    "#CC6600",
    "#9999FF",
    "#0066CC",
    "#99CCCC",
    "#999999",
    "#FFCC00",
    "#009999",
    "#99CC33",
    "#FF9900",
    "#999966",
    "#66CCCC",
    "#339966",
    "#CCCC33",
    "#003f5c",
    "#665191",
    "#a05195",
    "#d45087",
    "#2f4b7c",
    "#f95d6a",
    "#ff7c43",
    "#ffa600",
    "#EF6F6C",
    "#465775",
    "#56E39F",
    "#59C9A5",
    "#5B6C5D",
    "#0A2342",
    "#2CA58D",
    "#84BC9C",
    "#CBA328",
    "#F46197",
    "#DBCFB0",
    "#545775"
  ];

  
  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: ["a", "b", "c", "d"],
    datasets: [
      {
        data: [300, 50, 100, 50],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ]
  };
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
            <div> 
            <Pie
            type='pie'
            data={data}
          />
            </div>
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
