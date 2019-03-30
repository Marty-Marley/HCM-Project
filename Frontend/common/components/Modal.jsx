import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

const styles = {
}

class Modal extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue)
  }

  handleListItemClick = (value) => {
    this.props.onClose(value)
  }

  render() {
    const {
      classes, onClose, selectedValue, title, children, ...rest
    } = this.props

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...rest}>
        <DialogTitle id="simple-dialog-title">{title || ''}</DialogTitle>
        {children}
      </Dialog>
    )
  }
}

Modal.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
}

export default withStyles(styles)(Modal)
