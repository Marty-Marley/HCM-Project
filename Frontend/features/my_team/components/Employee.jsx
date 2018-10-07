import React from 'react'
import { string, arrayOf } from 'prop-types'

const Employee = ({
  id, name, email, avatar, entitlements
}) => (
    <>
      <p>{name}</p>
      <p>{id}</p>
      <p>{email}</p>
      <img src={avatar} alt={name} />
      {entitlements.map(entitlement => <p key={entitlement}>{entitlement}</p>)}
    </>
)

Employee.propTypes = {
  id: string,
  name: string,
  email: string,
  avatar: string,
  entitlements: arrayOf(string)
}

export default Employee
