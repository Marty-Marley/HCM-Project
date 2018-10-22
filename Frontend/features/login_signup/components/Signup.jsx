import React, { Component } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { Form } from '../styles/Form'
import { CURRENT_USER_QUERY } from '../../../app/components/User'

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($email: String!, $password: String!, $name: String!) {
    createUser(email: $email, password: $password, name: $name) {
      id
      email
      name
    }
  } 
`

class Signup extends Component {
  state = {
    email: '',
    password: '',
    name: '',
    age: '',
    avatar: ''
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  render() {
    const {
      email, password, name, age, avatar
    } = this.state
    return (
      <Mutation
        mutation={CREATE_USER_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(createUser, { loading }) => (
          <Form method="post" onSubmit={async (e) => {
            e.preventDefault()
            await createUser()
            this.setState({
              email: '', password: '', name: '', age: '', avatar: ''
            })
            Router.push('/')
          }}>
            <fieldset disabled={loading}>
              <h2>Create an account</h2>
              <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleInput} />
              <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleInput} />
              <input type="text" name="name" placeholder="Name" value={name} onChange={this.handleInput} />
              <input type="text" name="age" placeholder="Age" value={age} onChange={this.handleInput} />
              <input type="text" name="avatar" placeholder="Avatar" value={avatar} onChange={this.handleInput} />
              <button type="submit" style={{ background: '#2c93dd' }}>Sign Up</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Signup
