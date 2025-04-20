// Name: Phuc Le

import React from "react";
import User from "./User.jsx";

export default function UserList({ users = [], spells, collections, currUser, loading = false, message, onEditUser = f => f, onDeleteUser = f => f, update = f => f }) {
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
        users.map(user => <User key={user.id} {...user} currUser={currUser} onEditClicked={() => onEditUser(user)} onDeleteClicked={() => onDeleteUser(user)} />)
      }
    </div>
  );
}