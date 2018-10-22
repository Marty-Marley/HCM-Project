import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import User from './User'
import Signout from '../../features/login_signup/components/Signout'

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  font-size: 2rem;
  justify-content: center;
  background: ${props => props.theme.black};
  a {
    padding: 10px;
    &:hover {
      color: #124f15;
    }
  }
`

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
