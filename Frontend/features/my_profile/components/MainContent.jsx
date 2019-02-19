import React, { Component } from 'react'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import { Grid, IconButton, Typography } from '@material-ui/core'
import Edit from '@material-ui/icons/Edit'
import CurrencyFormat from 'react-currency-format'
import ShowDetailsForm from './ShowDetailsForm'
import EditProfileForm from './EditProfileForm'

const styles = theme => ({
  root: {
    position: 'relative'
  },
  sepatator: {
    display: 'inline-flex',
    width: '100px',
    fontWeight: '500'
  },
  detailsGrid: {
    marginTop: '24px',
  },
  icon: {
    fontSize: '16px'
  },
  notSpecified: {
    color: theme.requiresAction
  },
  edit: {
    position: 'absolute',
    top: '0',
    right: '0',
    color: theme.requiresAction,
  },
  title: {
    marginTop: '16px'
  },
  textField: {
    width: 200,
    margin: [[0], '!important']
  },
  menu: {
    width: 200,
  },
  update: {
    margin: '16px',
    backgroundColor: theme.requiresAction,
    color: 'white',
    '&:hover': {
      backgroundColor: '#693cb7'
    }
  },
  location: {
    margin: 0,
  }
})

class MainContent extends Component {
  state = {
    editMode: false
  }

  toggleEditMode = () => {
    const { editMode } = this.state
    this.setState({ editMode: !editMode })
  }

  render() {
    const { currentUser, classes } = this.props
    const { editMode } = this.state
    // * Incoming date is not a js DateTime so need to convert below * //
    const startDate = moment(new Date(currentUser.startDate)).format('DD-MMM-YYYY')
    const birthDate = moment(new Date(currentUser.birthDate)).format('DD-MMM-YYYY')
    let currencyPrefix = ''
    switch (currentUser.localCurrency) {
      case 'Pound':
        currencyPrefix = '£ '
        break
      case 'Dollar':
        currencyPrefix = '$ '
        break
      case 'Euro':
        currencyPrefix = '€ '
        break
      case 'Yuan':
        currencyPrefix = 'Ұ '
        break
      default:
        currencyPrefix = '£ '
    }
    const notSpecified = <span className={classes.notSpecified}>Not specified</span>
    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.title}>{`Worker Details ${editMode ? '- Editing' : ''}`}</Typography>
        <IconButton className={classes.edit} onClick={this.toggleEditMode}><Edit /></IconButton>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={8}
          className={classes.detailsGrid}
        >
          {
            !editMode
              ? <ShowDetailsForm
                currentUser={currentUser}
                classes={classes}
                notSpecified={notSpecified}
                startDate={startDate}
                currencyPrefix={currencyPrefix}
                birthDate={birthDate}
              />
              : <EditProfileForm classes={classes} currentUser={currentUser} currencyPrefix={currencyPrefix} startDate={startDate} tidyDate={birthDate} toggleEditMode={this.toggleEditMode} />
          }
        </Grid>
      </div>
    )
  }
}


export default withStyles(styles)(MainContent);
