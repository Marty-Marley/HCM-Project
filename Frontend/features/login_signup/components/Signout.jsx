import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import { CURRENT_USER_QUERY } from '../../../app/components/User'

/**
 * Signout mutation that will cause the client-side cookies to be cleared
 * This will log the user out
 */
const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

/**
 * Signout functional component which causes fires the logout functionality
 * and routes to the login page.
 */
const Signout = () => (
  <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {signout => (
      <button type="button" style={{ background: '#2c93dd', border: 'black' }} onClick={() => {
        signout()
        Router.push('/login')
      }}>
        Sign out
      </button>
    )}
  </Mutation>
)

export default Signout
