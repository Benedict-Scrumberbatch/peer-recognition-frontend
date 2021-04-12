Basic Header Component: 

```typescript jsx
<Header />
```

```typescript jsx static
class Header extends Component<Props> {
  constructor(props: any) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.grow}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <img src={UKGLogoImg} alt="logo" className={classes.logo} />
            <div className={classes.grow} />
            <img src={PlaceholderProfileImg} alt="profile photo" className={classes.profileCircle} />
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
```