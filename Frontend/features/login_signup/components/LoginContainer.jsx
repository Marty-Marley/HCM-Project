import React, { Component } from 'react'
import styled from 'styled-components'
import Login from './Login'
import Signup from './Signup'

const Container = styled.div`  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 750px;
  background-image: url("https://images.pexels.com/photos/533930/pexels-photo-533930.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
`
const LoginWrapper = styled.div`
  padding: 25px;
  height: 400px;
  background-color: #ffff;
  border-radius: 5px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5);
  position: relative;
  div {
    position: absolute;
    bottom: 0;
    border-top: 2px solid #777;
  }
`

class LoginContainer extends Component {
  state = {
    signup: false
  }

  toggleLogin = () => {
    const { signup } = this.state
    this.setState({ signup: !signup })
  }

  render() {
    const { signup } = this.state
    return (
      <Container>
        <LoginWrapper>
          {signup ? <Signup /> : <Login />}
          <div>
            <button type="button" onClick={this.toggleLogin}>{!signup ? 'Create Account' : 'Sign in'}</button>
            <button type="button">Forgot Password</button>
          </div>
        </LoginWrapper>
      </Container>
    )
  }
}

export default LoginContainer
