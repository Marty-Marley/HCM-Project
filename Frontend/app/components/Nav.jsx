import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import User from './User'
import Signout from '../../features/login_signup/components/Signout'

/**
 * Styled component for nav bar.
 */
const NavStyles = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  font-size: 2rem;
  justify-content: center;
  background: ${props => props.theme.black};
  a {
    padding: 10px;
    &:hover {
      color: #237cbc;
    }
    margin-right: auto;
    margin-left: auto;
  }
`
/**
 * Functional component for displaying the nav bar
 * Only display the sign out button if a user is logged in.
 */
const Nav = () => (
  <User>
    {({ data: { currentUser } }) => (
      <NavStyles>
        <Link href="/">
          <a>Dashboard</a>
        </Link>
        {currentUser
          && <Signout />
        }
      </NavStyles>
    )}
  </User>
)

export default Nav
