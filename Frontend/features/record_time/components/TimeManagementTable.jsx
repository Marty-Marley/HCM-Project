import React, { Component } from 'react'
import {
  arrayOf, shape, string, node, object
} from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, List, ListItem,
  ListItemIcon, ListItemText, DialogActions, DialogContent, DialogContentText,
  TextField, Button, Tooltip, Chip, Grid, Typography
} from '@material-ui/core'
import WorkIcon from '@material-ui/icons/WorkTwoTone'
import BeachAccess from '@material-ui/icons/BeachAccessTwoTone'
import { Mutation } from 'react-apollo'
import { withSnackbar } from 'notistack'
import Modal from '../../../common/components/Modal'
import { CURRENT_USER_TIMESHEET_QUERY, EDIT_TIMESHEET_MUTATION } from '../graphql'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  cell: {
    '&:hover': {
      backgroundColor: theme.table.hover
    }
  },
  submit: {
    marginTop: '16px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    float: 'right',
    '&:hover': {
      backgroundColor: '#1853ac'
    }
  },
  chip: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.white
  },
  chipAlternate: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.accent,
    color: theme.palette.white
  },
})

class TimeManagementTable extends Component {
  state = {
    showModal: false,
    modalPage: 1,
    week: {
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
    }
  }

  componentDidMount = () => {
    const { currentUser: { timeInfo } } = this.props
    const [currentWeek] = timeInfo.weeks

    delete currentWeek.monday.__typename
    delete currentWeek.tuesday.__typename
    delete currentWeek.wednesday.__typename
    delete currentWeek.thursday.__typename
    delete currentWeek.friday.__typename

    this.setState({
      week: {
        monday: currentWeek.monday,
        tuesday: currentWeek.tuesday,
        wednesday: currentWeek.wednesday,
        thursday: currentWeek.thursday,
        friday: currentWeek.friday,
      }
    })
  }

  toggleModal = (day) => {
    const { showModal, currentlySelectedDay } = this.state
    this.setState({ showModal: !showModal, currentlySelectedDay: day || currentlySelectedDay })
    if (!showModal) {
      this.setState({ modalPage: 1 })
    }
  }

  updateState = (property, value) => {
    this.setState({ [property]: value })
  }

  submitModal = (hours) => {
    const { currentlySelectedDay, type } = this.state
    this.setState(prevState => ({
      week: {
        ...prevState.week,
        [currentlySelectedDay]: {
          type,
          hours
        }
      }
    }))
    this.toggleModal()
  }

  returnModalContent = () => {
    const { modalPage } = this.state
    let hours = null

    if (modalPage === 1) {
      return (
        <DialogContent>
          <DialogContentText>
            Please select the type of time you would like to enter.
      </DialogContentText>
          <List>
            <ListItem button onClick={() => {
              this.updateState('type', 'WRK')
              this.updateState('modalPage', 2)
            }}
            >
              <ListItemIcon >
                <WorkIcon />
              </ListItemIcon >
              <ListItemText
                primary="Record your working hours"
                secondary={`Enter your time for ${this.state.currentlySelectedDay}`}
              />
            </ListItem>
            <ListItem button onClick={() => {
              this.updateState('type', 'PTO')
              this.updateState('modalPage', 2)
            }}
            >
              <ListItemIcon >
                <BeachAccess />
              </ListItemIcon >
              <ListItemText
                primary="Request Paid Time Off hours"
                secondary={`Request PTO on ${this.state.currentlySelectedDay}`}
              />
            </ListItem>
          </List>
        </DialogContent>
      )
    }
    if (modalPage === 2) {
      return (
        <>
          <DialogContent>
            <DialogContentText>
              Please enter the amout of hours you would like to submit.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="hours"
              label="Amount of hours"
              type="number"
              onChange={(e) => {
                hours = parseInt(e.target.value, 10)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              this.submitModal(hours)
            }} color="primary">
              Submit
            </Button>
          </DialogActions>
        </>
      )
    }
  }

  summonSnackbar = (fullName) => {
    this.props.enqueueSnackbar(`${fullName}'s timesheet has been updated.`, {
      variant: 'success',
      action: (
        <Button size="small">Dismiss</Button>
      ),
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }
    })
  }

  render() {
    const { classes, currentUser } = this.props
    const { showModal, week } = this.state
    const { hasSubmitted } = currentUser.timeInfo.weeks[0]

    const editTimesheeet = {
      monday: week.monday,
      tuesday: week.tuesday,
      wednesday: week.wednesday,
      thursday: week.thursday,
      friday: week.friday,
    }
    return (
      <>
        <Mutation
          mutation={EDIT_TIMESHEET_MUTATION}
          variables={editTimesheeet}
          refetchQueries={[{ query: CURRENT_USER_TIMESHEET_QUERY }]}
          onCompleted={({ editTimesheet }) => {
            const fullName = `${editTimesheet.firstName} ${editTimesheet.lastName}`
            this.summonSnackbar(fullName)
          }}
        >
          {editTimesheet => (
            <>
              <Typography variant="h5" component="h3" color="secondary">
                Current Week
              </Typography>
              <Paper className={classes.root} elevation={10}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Monday</TableCell>
                      <TableCell>Tuesday</TableCell>
                      <TableCell>Wednesday</TableCell>
                      <TableCell>Thursday</TableCell>
                      <TableCell>Friday</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className={classes.cell} onClick={() => this.toggleModal('monday')}>
                        <Grid
                          container
                          justify="space-between"
                          alignItems="center"
                        >
                          {week.monday ? week.monday.hours : 0}
                          {week.monday.type && <Chip label={week.monday.type} className={week.monday.type === 'WRK' ? classes.chip : classes.chipAlternate} />}
                        </Grid>
                      </TableCell>
                      <TableCell className={classes.cell} onClick={() => this.toggleModal('tuesday')}>
                        <Grid
                          container
                          justify="space-between"
                          alignItems="center"
                        >
                          {week.tuesday ? week.tuesday.hours : 0}
                          {week.tuesday.type && <Chip label={week.tuesday.type} className={week.tuesday.type === 'WRK' ? classes.chip : classes.chipAlternate} />}
                        </Grid>
                      </TableCell>
                      <TableCell className={classes.cell} onClick={() => this.toggleModal('wednesday')}>
                        <Grid
                          container
                          justify="space-between"
                          alignItems="center"
                        >
                          {week.wednesday ? week.wednesday.hours : 0}
                          {week.wednesday.type && <Chip label={week.wednesday.type} className={week.wednesday.type === 'WRK' ? classes.chip : classes.chipAlternate} />}
                        </Grid>
                      </TableCell>
                      <TableCell className={classes.cell} onClick={() => this.toggleModal('thursday')}>
                        <Grid
                          container
                          justify="space-between"
                          alignItems="center"
                        >
                          {week.thursday ? week.thursday.hours : 0}
                          {week.thursday.type && <Chip label={week.thursday.type} className={week.thursday.type === 'WRK' ? classes.chip : classes.chipAlternate} />}
                        </Grid>
                      </TableCell>
                      <TableCell className={classes.cell} onClick={() => this.toggleModal('friday')}>
                        <Grid
                          container
                          justify="space-between"
                          alignItems="center"
                        >
                          {week.friday ? week.friday.hours : 0}
                          {week.friday.type && <Chip label={week.friday.type} className={week.friday.type === 'WRK' ? classes.chip : classes.chipAlternate} />}
                        </Grid>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper >
              <Button className={classes.submit} onClick={() => editTimesheet()} disabled={false}>{!hasSubmitted ? 'Submit' : 'Update'}</Button>
            </>
          )}
        </Mutation>
        <Modal
          fullWidth
          open={showModal}
          onClose={this.toggleModal}
          title="Manage your time"
        >
          {this.returnModalContent()}
        </Modal>
      </>
    )
  }
}


export default withStyles(styles)(
  withSnackbar(TimeManagementTable),
)
