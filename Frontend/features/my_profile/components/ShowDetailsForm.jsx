import React, { Component } from 'react'
import { Grid, IconButton, Typography } from '@material-ui/core'
import CurrencyFormat from 'react-currency-format'

const ShowDetailsForm = ({
  currentUser,
  classes,
  notSpecified,
  startDate,
  currencyPrefix,
  birthDate
}) => {
  const columnSizes = {
    mobile: 12,
    medium: 6,
    large: 4
  }
  return <>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Title</Typography>
      <Typography variant="subtitle1" inline>{currentUser.title || notSpecified}</Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Gender</Typography>
      <Typography variant="subtitle1" inline>{currentUser.gender || notSpecified}</Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Address</Typography>
      <Typography variant="subtitle1" inline>{currentUser.address || notSpecified}</Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>First Name</Typography>
      <Typography variant="subtitle1" inline>{currentUser.firstName || notSpecified}</Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Date of birth</Typography>
      <Typography variant="subtitle1" inline>{birthDate || notSpecified}</Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Location</Typography>
      <Typography variant="subtitle1" inline>{currentUser.location || notSpecified}</Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Last Name</Typography>
      <Typography variant="subtitle1" inline>{currentUser.lastName || notSpecified}</Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Salary</Typography>
      <Typography variant="subtitle1" inline>
        {<CurrencyFormat value={currentUser.salary} displayType="text" thousandSeparator prefix={currencyPrefix} /> || notSpecified}
      </Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Mobile</Typography>
      <Typography variant="subtitle1" inline>{currentUser.mobileNumber || notSpecified}</Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Email</Typography>
      <Typography variant="subtitle1" inline>{currentUser.email || notSpecified}</Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Start Date</Typography>
      <Typography variant="subtitle1" inline>{startDate || notSpecified}</Typography>
    </Grid>
    <Grid item xs={columnSizes.mobile} sm={columnSizes.medium} md={columnSizes.large}>
      <Typography variant="subtitle1" inline className={classes.sepatator}>Currency</Typography>
      <Typography variant="subtitle1" inline>{currentUser.localCurrency || notSpecified}</Typography>
    </Grid>
  </>
}

export default ShowDetailsForm
