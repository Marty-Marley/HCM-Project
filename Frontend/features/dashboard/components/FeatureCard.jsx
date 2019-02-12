import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link'


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
});

const FeatureCard = (props) => {
  const { classes, currentUser } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        title="Features"
        subheader="You are currently entitled to:"
      />
      <Divider variant="middle" />
      <CardContent>
        <ul>
          {currentUser.entitlements.map(entitlement => <li key={entitlement}><Link href={`/${entitlement.toLowerCase()}`}><a className={classes.a}>{entitlement}</a></Link></li>)}
        </ul>
      </CardContent>
    </Card>
  )
}

FeatureCard.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeatureCard);
