import React from 'react'
import { useParams } from 'react-router-dom'
import User from './User'

export default function UserDetails({ users, loading = false, message, onViewUser = f => f, onEditUser = f => f, onDeleteUser = f => f, update = f => f  }) {

  let params = useParams()
  let id = params.id
  let user = users.find((item) => item.id === Number(id))

  const body = user ?  <User {...user} onViewClicked={() => onViewUser(user)} onEditClicked={() => onEditUser(user)} onDeleteClicked={() => onDeleteUser(user)} /> : <span>User {id} not found.</span>
  
  return (
    <div>
      <h1>User Details</h1>
      {body}
    </div>

  )
}