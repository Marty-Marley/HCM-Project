import React, { Component } from 'react'
import {
  Grid, IconButton, Typography, TextField, MenuItem, Button
} from '@material-ui/core'
import CurrencyFormat from 'react-currency-format'
import DatePicker from 'react-datepicker'
import Geosuggest from 'react-geosuggest'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { CURRENT_USER_QUERY, EDIT_USER_MUTATION } from '../graphql'

class EditProfileForm extends Component {
  state = {

  }

  componentDidMount = () => {
    this.setState(this.props.currentUser, () => {
      if (!this.state.birthDate) {
        this.setState({ birthDate: new Date() })
      }
    })
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  }

  handleDateChange = (date) => {
    // console.log(new Date(date))kj
    this.setState({ birthDate: date })
  }

  handleLocationChange = (location) => {
    if (location) {
      this.setState({ location: location.description })
    }
  }

  summonSnackbar = (fullName) => {
    this.props.enqueueSnackbar(`${fullName}'s profile has been updated.`, {
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
    const {
      currentUser,
      classes,
      notSpecified,
      startDate,
      currencyPrefix,
      toggleEditMode
    } = this.props
    const {
      title, email, firstName, lastName, address, gender, location, birthDate, mobileNumber, localCurrency
    } = this.state
    const columnSizes = {
      mobile: 12,
      medium: 6,
      large: 4
    }
    return (
      <>
        <Head>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA2ylfU82_oPeb8JTOjOhUQQwyQizDUUc&libraries=places" />
          <link rel="stylesheet" type="text/css" href="../../static/geosuggest.css" />
          <link rel="stylesheet" type="text/css" href="../../static/react-datepicker.css" />
        </Head>
        <Mutation
          mutation={EDIT_USER_MUTATION}
          variables={this.state}
          onCompleted={({ editProfile }) => {
            const fullName = `${editProfile.firstName} ${editProfile.lastName}`
            this.summonSnackbar(fullName)
            toggleEditMode()
          }}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(editProfile, { error, loading }) => <>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Grid container direction="row" alignItems="center">
                <Typography variant="subtitle1" inline className={classes.sepatator}>Title</Typography>
                <TextField
                  id="select-title"
                  select
                  label={title ? '' : 'Title'}
                  className={classes.textField}
                  value={title || ''}
                  onChange={this.handleChange('title')}
                  margin="normal"
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  style={{ margin: '0', marginLeft: '7px' }}
                  required
                >
                  <MenuItem value="Mr">
                    Mr
                </MenuItem>
                  <MenuItem value="Mrs">
                    Mrs
                </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Grid container direction="row" alignItems="center">
                <Typography variant="subtitle1" inline className={classes.sepatator}>Gender</Typography>
                {/* <Typography variant="subtitle1" inline>{currentUser.title || notSpecified}</Typography> */}
                <TextField
                  id="select-gender"
                  select
                  label={gender ? '' : 'Gender'}
                  className={classes.textField}
                  value={gender || ''}
                  onChange={this.handleChange('gender')}
                  margin="normal"
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  style={{ margin: '0', marginLeft: '7px' }}
                  required
                >
                  <MenuItem value="Male">
                    Male
                </MenuItem>
                  <MenuItem value="Female">
                    Female
                </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Grid container direction="row" alignItems="center">
                <Typography variant="subtitle1" inline className={classes.sepatator}>Address</Typography>
                <TextField
                  id="standard-address"
                  label={address ? '' : 'Address'}
                  className={classes.textField}
                  value={address || ''}
                  onChange={this.handleChange('address')}
                  margin="none"
                  required
                />
              </Grid>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Grid container direction="row" alignItems="center">
                <Typography variant="subtitle1" inline className={classes.sepatator}>First Name</Typography>
                <TextField
                  id="standard-fname"
                  className={classes.textField}
                  value={firstName || ''}
                  onChange={this.handleChange('firstName')}
                  margin="none"
                  required
                />
              </Grid>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Grid container direction="row" alignItems="center">
                <Typography variant="subtitle1" inline className={classes.sepatator}>Date of birth</Typography>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={new Date(birthDate)}
                  onSelect={this.handleDateChange}
                  onChange={this.handleDateChange}
                />
              </Grid>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Grid container direction="row" alignItems="center">
                <Typography variant="subtitle1" inline className={classes.sepatator}>Location</Typography>
                <Geosuggest onSuggestSelect={this.handleLocationChange} initialValue={location} className={classes.location} />
              </Grid>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Grid container direction="row" alignItems="center">
                <Typography variant="subtitle1" inline className={classes.sepatator}>Last Name</Typography>
                <TextField
                  id="standard-lname"
                  className={classes.textField}
                  value={lastName || ''}
                  onChange={this.handleChange('lastName')}
                  margin="none"
                  required
                />
              </Grid>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Typography variant="subtitle1" inline className={classes.sepatator}>Salary</Typography>
              <Typography variant="subtitle1" inline>
                {<CurrencyFormat value={currentUser.salary} displayType="text" thousandSeparator prefix={currencyPrefix} /> || notSpecified}
              </Typography>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Grid container direction="row" alignItems="center">
                <Typography variant="subtitle1" inline className={classes.sepatator}>Mobile</Typography>
                <TextField
                  id="standard-mobile"
                  label={mobileNumber ? '' : 'Mobile Number'}
                  className={classes.textField}
                  value={mobileNumber || ''}
                  onChange={this.handleChange('mobileNumber')}
                  margin="none"
                  required
                />
              </Grid>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Grid container direction="row" alignItems="center">
                <Typography variant="subtitle1" inline className={classes.sepatator}>Email</Typography>
                <TextField
                  id="standard-email"
                  className={classes.textField}
                  value={email || ''}
                  onChange={this.handleChange('email')}
                  margin="none"
                  required
                />
              </Grid>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Typography variant="subtitle1" inline className={classes.sepatator}>Start Date</Typography>
              <Typography variant="subtitle1" inline>{startDate || notSpecified}</Typography>
            </Grid>
            <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
              <Grid container direction="row" alignItems="center">
                <Typography variant="subtitle1" inline className={classes.sepatator}>Currency</Typography>
                {/* <Typography variant="subtitle1" inline>{currentUser.title || notSpecified}</Typography> */}
                <TextField
                  id="select-currency"
                  select
                  label={localCurrency ? '' : 'Currency'}
                  className={classes.textField}
                  value={localCurrency || ''}
                  onChange={this.handleChange('localCurrency')}
                  margin="normal"
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  style={{ margin: '0', marginLeft: '7px' }}
                  required
                >
                  <MenuItem value="Pound">
                    Pound
                </MenuItem>
                  <MenuItem value="Dollar">
                    Dollar
                </MenuItem>
                  <MenuItem value="Euro">
                    Euro
                </MenuItem>
                  <MenuItem value="Yuan">
                    Yuan
                </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button className={classes.update} type="submit" onClick={() => editProfile()}>Update</Button>
          </>}
        </Mutation>
      </>
    )
  }
}

EditProfileForm.propTypes = {
  classes: PropTypes.object.isRequired,
  notSpecified: PropTypes.node,
  startDate: PropTypes.string,
  currencyPrefix: PropTypes.string
}

export default withSnackbar(EditProfileForm)
