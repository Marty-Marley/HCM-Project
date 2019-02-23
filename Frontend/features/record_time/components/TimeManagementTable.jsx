import React, { Component } from 'react'
import {
  arrayOf, shape, string, node, object
} from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper, List, ListItem,
  ListItemIcon, ListItemText, DialogActions, DialogContent, DialogContentText,
  TextField, Button
} from '@material-ui/core'
import WorkIcon from '@material-ui/icons/WorkTwoTone'
import BeachAccess from '@material-ui/icons/BeachAccessTwoTone'

import Modal from '../../../common/components/Modal'

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
  }
})


class TimeManagementTable extends Component {
  state = {
    showModal: false,
    modalPage: 1,
    week: {
      Monday: null,
      Tuesday: null,
      Wednesday: null,
      Thursday: null,
      Friday: null,
    }
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
    const { currentlySelectedDay, hoursType } = this.state
    this.setState(prevState => ({
      week: {
        ...prevState.week,
        [currentlySelectedDay]: {
          hoursType,
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
              this.updateState('hoursType', 'WRK')
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
              this.updateState('hoursType', 'PTO')
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

  render() {
    const { classes } = this.props
    const { showModal, week } = this.state
    return (
      <>
        <Paper className={classes.root}>
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
                <TableCell className={classes.cell} onClick={() => this.toggleModal('Monday')}>{week.Monday ? week.Monday.hours : 0}</TableCell>
                <TableCell className={classes.cell} onClick={() => this.toggleModal('Tuesday')}>{week.Tuesday ? week.Tuesday.hours : 0}</TableCell>
                <TableCell className={classes.cell} onClick={() => this.toggleModal('Wednesday')}>{week.Wednesday ? week.Wednesday.hours : 0}</TableCell>
                <TableCell className={classes.cell} onClick={() => this.toggleModal('Thursday')}>{week.Thursday ? week.Thursday.hours : 0}</TableCell>
                <TableCell className={classes.cell} onClick={() => this.toggleModal('Friday')}>{week.Friday ? week.Friday.hours : 0}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper >
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


export default withStyles(styles)(TimeManagementTable)
