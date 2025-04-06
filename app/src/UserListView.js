// Name: Phuc Le

import React from "react";
import User from "./User.jsx";

export default function UserList({ users = [], loading = false, message, onViewUser = f => f, onEditUser = f => f, onDeleteUser = f => f, update = f => f }) {
  if (message) {
    return <div>{message}</div>
  } else if (loading) {
    return <div>Loading ......</div>;
  } else if(!users.length) {
    return <div>No Users Listed.</div>;
  } 
  return (
    <div>
      {
        users.map(user => <User key={user.id} {...user} onViewClicked={() => onViewUser(user)} onEditClicked={() => onEditUser(user)} onDeleteClicked={() => onDeleteUser(user)} />)
      }
    </div>
  );
}