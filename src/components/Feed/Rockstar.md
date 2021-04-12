Basic rockstar component:

```typescript jsx
<RockstarCard />
```


```js static
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

```
