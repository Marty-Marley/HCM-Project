import styled from 'styled-components'

const Container = styled.div`  
  display: grid;
  grid-template-rows: auto;
  justify-items: center;
  align-items: center;
  height: 761px;
  background-image: url("https://images.pexels.com/photos/533930/pexels-photo-533930.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
`
const Form = styled.form`
  border-radius: 5px;
  fieldset {
    display: flex;
    border: 0;
    padding: 10px; 
    &[disabled] {
      opacity: 0.5;
    }
    button, input {
      margin-bottom: 10px;
      font-size: 1.5rem;
      height: 30px;
      min-width: 200px;
      border: none;
      border-bottom: 2px solid #777;
    }
  }
`

export { Container, Form }
