import React, { Component } from 'react'
import styled from 'styled-components'
import Router from 'next/router'


const FormWrapper = styled.div`  
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  height: 761px;
  background-image: url("https://images.pexels.com/photos/533930/pexels-photo-533930.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
`
const Form = styled.form`
  height: 50%;
  width: 50%;
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  background: rgba(4, 48, 86, 0.6);
  font-size: 2rem;
  border-radius: 5px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  fieldset {
    display: flex;
    border: 0;
    padding: 10px; 
    &[disabled] {
      opacity: 0.5;
    }
    button, input {
      margin-bottom: 10px;
      border-radius: 5px;
      font-size: 1.5rem;
      height: 30px;
      min-width: 200px;
    }
  }
`
class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  /**
  * Reusable function for updating state for a controlled input
  * @param {event} e - Event object from onChange
  */
  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  render() {
    const { email, password } = this.state
    return (
      <FormWrapper>
        <Form onSubmit={(e) => {
          e.preventDefault()
          this.setState({ email: '', password: '' })
          Router.push('/')
        }}>
          <fieldset>
            <input type="email" name="email" placeholder="Email" value={email} onChange={this.handleInput} />
            <input type="password" name="password" placeholder="Password" value={password} onChange={this.handleInput} />
            <button type="submit">Login</button>
          </fieldset>
        </Form>
      </FormWrapper>
    )
  }
}

export default Login
