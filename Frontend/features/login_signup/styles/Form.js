import styled from 'styled-components'

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

export default Form
