const profilePageStyles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '24px'
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
})

export default profilePageStyles
