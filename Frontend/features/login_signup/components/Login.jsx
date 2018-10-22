import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Form } from '../styles/Form'
import { CURRENT_USER_QUERY } from '../../../app/components/User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  } 
`

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

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
