import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import {
  Button, Grid, Typography, Drawer, Avatar, TextField
} from '@material-ui/core'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'

const styles = theme => ({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  avatar: {
    margin: 50,
    width: 140,
    height: 140,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  sepatator: {
    display: 'inline-flex',
    width: '125px',
    fontWeight: '550',
    fontSize: '20px'
  },
  value: {
    fontSize: '20px',
    fontWeight: '25',
  },
  pushRight: {
    marginRight: '100px'
  },
  smallFont: {
    fontSize: '16px'
  },
  text: {
    padding: '32px !important'
  }
})

const MoreInfoDrawer = ({
  showDrawer, toggleDrawer, member, classes, role
}) => {
  const fullName = `${member.firstName} ${member.lastName}`
  const notSpecified = 'Not specified'
  const startDate = moment(new Date(member.startDate)).format('DD-MMM-YYYY')
  let currencyPrefix = ''
  switch (member.localCurrency) {
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
  return (
    <Drawer
      anchor="bottom"
      open={showDrawer}
      onClose={toggleDrawer}
    >
      <div
        tabIndex={0}
        role="button"
        onClick={toggleDrawer}
        onKeyDown={toggleDrawer}
      >
        <Grid container direction="row" spacing={24} alignItems="center">
          <Grid item xs={12} sm={4}><Avatar alt={member.firstName} src={member.avatar} className={classes.avatar} /></Grid>
          <Grid item xs={12} sm={8} className={classes.text}>
            <Grid item container direction="row" justify="center" alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" inline className={classes.sepatator}>ID</Typography>
                <Typography variant="subtitle1" inline className={classes.smallFont}>{member.id}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" inline className={classes.sepatator}>Salary</Typography>
                <Typography variant="subtitle1" inline className={classes.value}>{<CurrencyFormat value={member.salary} displayType="text" thousandSeparator prefix={currencyPrefix} />}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" inline className={classes.sepatator}>Name</Typography>
                <Typography variant="subtitle1" inline className={classes.value}>{fullName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" inline className={classes.sepatator}>Start Date</Typography>
                <Typography variant="subtitle1" inline className={classes.value}>{startDate}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" inline className={classes.sepatator}>Email</Typography>
                <Typography variant="subtitle1" inline className={classes.value}>{member.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" inline className={classes.sepatator}>Mobile</Typography>
                <Typography variant="subtitle1" inline className={classes.value}>{member.mobile || notSpecified}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" inline className={classes.sepatator}>Role</Typography>
                <Typography variant="subtitle1" inline className={classes.value}>{role}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" inline className={classes.sepatator}>Location</Typography>
                <Typography variant="subtitle1" inline className={classes.value}>{member.location || notSpecified}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Drawer>
  )
}

export default withStyles(styles)(MoreInfoDrawer)
