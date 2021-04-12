Basic Post component:

```typescript jsx
<RecipeReviewCard />
```


```typescript jsx static
export default function RecipeReviewCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Box display="flex" flexDirection="row" style={{ marginTop: 8}}>
        <div>
          <img src={PlaceholderProfileImg} alt="profile" className={classes.profilePhoto} />
          <Typography variant="body2" color="textSecondary" style={{ marginLeft: 20 }}>
              September 14, 2016
          </Typography>
        </div>
        <div>
          <CardContent>
            <Typography variant="h4" className={classes.themeColor} style={{ display: 'inline-block' }}>
              <Link href="#" color="inherit" style={{ textDecoration: 'none' }}>John Doe</Link>
            </Typography>
            <Typography variant="h6" color="textSecondary" style={{ display: 'inline-block' }}>
              &nbsp;has been recognized by&nbsp;
              <Link href="#" color="inherit" style={{ textDecoration: 'none' }}>Jane Doe</Link>
            </Typography>
            
            <Typography variant="body2" color="textSecondary" component="p" style={{ marginTop: 8 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              TEAMWORK - 2
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              LEADERSHIP - 65
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              ORGANIZATION - 11
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              COMMUNICATION - 1
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              CRITICAL THINKING - 8
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              POSITIVE ATTITUDE - 391
            </ColorButton>
            <ColorButton variant="contained" color="primary" className={classes.buttons} disableElevation>
              WORK ETHIC - 53
            </ColorButton>
          </CardContent>
        </div>
      </Box>
    </Card>
  );
}
```
