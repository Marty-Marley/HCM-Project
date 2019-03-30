import React from 'react'
import { string, arrayOf } from 'prop-types'

/**
 * Employee functional component for receiving and structuring employee data.
 */
const Employee = ({
  id, firstName, email, avatar
}) => (
    <>
      <p>{firstName}</p>
      <p>{id}</p>
      <p>{email}</p>
      <img src={avatar} alt={firstName} />
    </>
)

/**
 * Employee propTypes for defing the types of props that are being passed in.
 */
Employee.propTypes = {
  id: string,
  firstName: string,
  email: string,
  avatar: string,
  entitlements: arrayOf(string)
}

export default Employee
