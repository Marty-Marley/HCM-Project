import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import { CURRENT_USER_QUERY } from '../../../app/components/User'

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

const Signout = props => (
  <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {signout => (
      <button type="button" onClick={() => {
        signout()
        Router.push('/login')
      }}>
        Sign out
      </button>
    )}
  </Mutation>
)

export default Signout
