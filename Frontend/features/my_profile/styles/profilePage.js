const profilePageStyles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  }
})

export default profilePageStyles
