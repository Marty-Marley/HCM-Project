import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Grid, Card, CardHeader, CardContent, Divider, Tooltip, Typography
} from '@material-ui/core'
import Link from 'next/link'
import Permissions from '../../../static/icons/permissions.svg'
import Time from '../../../static/icons/time.svg'
import Profile from '../../../static/icons/profile.svg'
import Team from '../../../static/icons/team.svg'


const styles = theme => ({
  card: {
    minWidth: 300,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  a: {
    color: theme.link.primary,
    textDecoration: 'none',
    '&:hover': {
      color: theme.link.hover
    }
  },
  iconBackground: {
    '&:hover': {
      backgroundColor: '#f0f0f0',
      borderRadius: '20px',
      cursor: 'pointer',
    }
  },
  noFeatures: {
    marginTop: '10px'
  }
});

const FeatureCard = (props) => {
  const { classes, currentUser } = props;
  const iconSize = 100
  return (
    <Card className={classes.card} elevation={10}>
      <CardHeader
        title="Features"
        subheader="You are currently entitled to:"
      />
      <Divider variant="middle" />
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          spacing={24}
        >
          {currentUser.entitlements.map((entitlement) => {
            if (entitlement === 'MY_PROFILE') return <Link href={`/${entitlement.toLowerCase()}`} key={entitlement}><Grid item><Profile height={iconSize} width={iconSize} className={classes.iconBackground} /><Typography variant="h6" component="h6" align="center">{entitlement.replace('_', ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}</Typography></Grid></Link>
            if (entitlement === 'RECORD_TIME') return <Link href={`/${entitlement.toLowerCase()}`} key={entitlement}><Grid item><Time height={iconSize} width={iconSize} className={classes.iconBackground} /><Typography variant="h6" component="h6" align="center">{entitlement.replace('_', ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}</Typography></Grid></Link>
            if (entitlement === 'MY_TEAM') return <Link href={`/${entitlement.toLowerCase()}`} key={entitlement}><Grid item><Team height={iconSize} width={iconSize} className={classes.iconBackground} /><Typography variant="h6" component="h6" align="center">{entitlement.replace('_', ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}</Typography></Grid></Link>
            if (entitlement === 'PERMISSIONS') return <Link href={`/${entitlement.toLowerCase()}`} key={entitlement}><Grid item><Permissions height={iconSize} width={iconSize} className={classes.iconBackground} /><Typography variant="h6" component="h6" align="center">{entitlement.replace('_', ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}</Typography></Grid></Link>
          })}
          {currentUser.entitlements.length === 0 && <Typography variant="subheading" component="h6" align="center" className={classes.noFeatures}>It looks like you have no permissions. Contact a system administrator.</Typography>}
        </Grid>
      </CardContent>
    </Card>
  )
}

FeatureCard.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeatureCard);
