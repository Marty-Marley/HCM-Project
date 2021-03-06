import React from 'react'
import styled from 'styled-components'
import { node } from 'prop-types'

/**
 * Styled component for a card
 */
const CardStyles = styled.div`
  background: #f9fbff;
  border-radius: 2px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  text-align: center;
`

/**
 * Functional component for wrapping any children in the card styles
 */
const Card = ({ children }) => (
  <CardStyles>
    {children}
  </CardStyles>
)
Card.propTypes = {
  children: node.isRequired
}

export default Card
