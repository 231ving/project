// Name: Phuc Le

import { useLocation } from 'react-router-dom'

export default function User({ id, email, username, password, admin, onViewClicked = f => f, onEditClicked = f => f, onDeleteClicked = f => f}) {
    let user = {
      id: id,
      email: email,
      username: username,
      password: password,
      admin: admin
    }
    let admin_str = 'True'
    if (user.admin === 0) {
        admin_str = 'False'
    }

    let location = useLocation()
    function view_back() {
      if (location.pathname !== `/users/${id}`) {
        return <div className='col-4'><a href={`/users/${user.id}`} className='button'>View</a></div>
      } else {
        return <div className='col-4'><a href={`/users`} className='button'>Back</a></div>
      }
    }
    
    return (
      <section>
        <div className='container'>
            <div className='row spelldetails'>
              <p className='col-lg-3 col-sm-3 col-s-6 col-6 spellname'>Username: {user.username}</p> 
              <p className='col-lg-3 col-sm-3 col-s-6 col-6'>ID: {user.id}</p>
              <p className='col-lg-3 col-sm-3 col-s-6 col-6'>Email: {user.email}</p>
              <p className='col-lg-3 col-sm-3 col-s-6 col-6'>User Password: {user.password}</p>
              <p className='col-lg-12 col-sm-12 col-s-12 col-12'>Admin: {admin_str}</p>
              {view_back()}
              <button className='col-4' onClick={() => onEditClicked(user)}>Edit</button>
              <button className='col-4' onClick={() => onDeleteClicked(user)}>Delete</button>
            </div>
        </div>
      </section>
    ); 
  }