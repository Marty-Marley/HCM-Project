import React, { Component } from 'react'
import {
  Grid, IconButton, Typography, TextField, MenuItem
} from '@material-ui/core'
import CurrencyFormat from 'react-currency-format'

class EditProfileForm extends Component {
  state = {

  }

  componentDidMount = () => {
    this.setState(this.props.currentUser)
  }

  handleChange = name => (event) => {
    this.setState({ [name]: event.target.value });
  }

  render() {
    const {
      currentUser,
      classes,
      notSpecified,
      startDate,
      currencyPrefix
    } = this.props
    const {
      title, email, firstName, lastName, address, gender, location, birthDate, mobileNumber, localCurrency
    } = this.state
    return (
      <>
        <Grid item xs={12} sm={6}>
          <Grid container direction="row" alignItems="center">
            <Typography variant="subtitle1" inline className={classes.sepatator}>Title</Typography>
            {/* <Typography variant="subtitle1" inline>{currentUser.title || notSpecified}</Typography> */}
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
        <Grid item xs={12} sm={6}>
          <Grid container direction="row" alignItems="center">
            <Typography variant="subtitle1" inline className={classes.sepatator}>Email</Typography>
            <TextField
              id="standard-email"
              className={classes.textField}
              value={email || ''}
              onChange={this.handleChange('email')}
              margin="none"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction="row" alignItems="center">
            <Typography variant="subtitle1" inline className={classes.sepatator}>First Name</Typography>
            <TextField
              id="standard-fname"
              className={classes.textField}
              value={firstName || ''}
              onChange={this.handleChange('firstName')}
              margin="none"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" inline className={classes.sepatator}>Salary</Typography>
          <Typography variant="subtitle1" inline>
            {<CurrencyFormat value={currentUser.salary} displayType="text" thousandSeparator prefix={currencyPrefix} /> || notSpecified}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction="row" alignItems="center">
            <Typography variant="subtitle1" inline className={classes.sepatator}>Last Name</Typography>
            <TextField
              id="standard-lname"
              className={classes.textField}
              value={lastName || ''}
              onChange={this.handleChange('lastName')}
              margin="none"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction="row" alignItems="center">
            <Typography variant="subtitle1" inline className={classes.sepatator}>Address</Typography>
            <TextField
              id="standard-address"
              label={address ? '' : 'Address'}
              className={classes.textField}
              value={address || ''}
              onChange={this.handleChange('address')}
              margin="none"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
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
        <Grid item xs={12} sm={6}>
          <Grid container direction="row" alignItems="center">
            <Typography variant="subtitle1" inline className={classes.sepatator}>Location</Typography>
            <TextField
              id="standard-location"
              label={location ? '' : 'Location'}
              className={classes.textField}
              value={location || ''}
              onChange={this.handleChange('location')}
              margin="none"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction="row" alignItems="center">
            <Typography variant="subtitle1" inline className={classes.sepatator}>Date of birth</Typography>
            <TextField
              id="standard-dob"
              label={birthDate ? '' : 'Date of birth'}
              className={classes.textField}
              value={birthDate || ''}
              onChange={this.handleChange('birthDate')}
              margin="none"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction="row" alignItems="center">
            <Typography variant="subtitle1" inline className={classes.sepatator}>Mobile Number</Typography>
            <TextField
              id="standard-mobile"
              label={mobileNumber ? '' : 'Mobile Number'}
              className={classes.textField}
              value={mobileNumber || ''}
              onChange={this.handleChange('mobileNumber')}
              margin="none"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" inline className={classes.sepatator}>Start Date</Typography>
          <Typography variant="subtitle1" inline>{startDate || notSpecified}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
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
              <MenuItem value="Yuen">
                Yuen
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default EditProfileForm
