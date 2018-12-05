import React from 'react'
import { string, arrayOf } from 'prop-types'

/**
 * Employee functional component for receiving and structuring employee data.
 */
const Employee = ({
  id, name, email, avatar
}) => (
    <>
      <p>{name}</p>
      <p>{id}</p>
      <p>{email}</p>
      <img src={avatar} alt={name} />
    </>
)

/**
 * Employee propTypes for defing the types of props that are being passed in.
 */
Employee.propTypes = {
  id: string,
  name: string,
  email: string,
  avatar: string,
  entitlements: arrayOf(string)
}

export default Employee
