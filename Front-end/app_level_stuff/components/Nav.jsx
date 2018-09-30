import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

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
  <NavStyles>
    <Link href="/login">
      <a>Login</a>
    </Link>
    <Link href="/">
      <a>Dashboard</a>
    </Link>
  </NavStyles>
)

export default Nav
