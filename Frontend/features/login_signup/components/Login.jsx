import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Form from '../styles/Form'
import { CURRENT_USER_QUERY } from '../../../app/components/User'

/**
 * Signin mutation which receives sigin in data to be sent to server
 */
const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  } 
`
/**
 * Login class component which facilitates the retrieval of user input data from login,
 */
class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  /**
   * Reusable function for assigning input data to state.
   */
  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  render() {
    const {
      email, password
    } = this.state
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signin, { error, loading }) => (
          <Form method="post" onSubmit={async (e) => {
            e.preventDefault()
            await signin()
            this.setState({
              email: '', password: ''
            })
            if (Router.route === '/login') {
              Router.push('/')
            }
          }}>
            <fieldset disabled={loading}>
              {error && <p style={{ color: 'red' }}>{error.message.replace('GraphQL error: ', '')}</p>}
              <h2>Please sign in.</h2>
              <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleInput} />
              <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleInput} />
              <button type="submit" style={{ background: '#2c93dd' }}>Sign in</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Login
