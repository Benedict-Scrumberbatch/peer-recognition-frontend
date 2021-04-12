Basic Footer Component:
```typescript jsx
<Footer />
```
```typescript jsx static 
class Footer extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="body1">
            &copy; 2021 UKG
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}
```