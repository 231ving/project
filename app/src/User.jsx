// Name: Phuc Le

import { useLocation, useNavigate } from 'react-router-dom'

export default function User({ id, email, username, password, admin, currUser, onEditClicked = f => f, onDeleteClicked = f => f}) {
  const navigate = useNavigate()
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

  function onEdit(user) {
    onEditClicked(user)
    navigate(`/users/${user.id}/edit`)
  }

  function view_back() {
    if (location.pathname !== `/users/${id}`) {
      return <button className='col-3'onClick={() => navigate(`/users/${user.id}`)}>View</button>
    } else {
      return <button className='col-3'onClick={() => navigate(`/users`)}>Back</button>
    }
  }

  function show_password() {
    if ((currUser.username === user.username && currUser.email === user.email) || currUser.admin === 1) {
      return <p className='col-lg-3 col-sm-6 col-s-6 col-12'>Password: {user.password}</p>
    } else {
      return <p className='col-lg-3 col-sm-6 col-s-6 col-12'>Password: ******</p>
    }
  }

  function allow_edit(){
    if ((currUser.username === user.username && currUser.email === user.email && currUser.password === user.password) || currUser.admin === 1) {
      return <button className='col-3' onClick={() => onEdit(user)}>Edit</button>
    } else {
      return <div className='col-3'>Edit Unavailable</div>
    }
  }

  function allow_delete(){
    if ((currUser.username === user.username && currUser.email === user.email && currUser.password === user.password) || currUser.admin === 1) {
      return <button className='col-3' onClick={() => onDeleteClicked(user)}>Delete</button>
    } else {
      return <div className='col-3'>Delete Unavailable</div>
    }
  }
    
  return (
    <section className='single_spell'>
      <div className='container'>
          <div className='row spelldetails'>
            <p className='col-lg-3 col-sm-6 col-s-6 col-12'>Username: {user.username}</p> 
            <p className='col-lg-3 col-sm-6 col-s-6 col-12'>Email: {user.email}</p>
            {show_password()}
            <p className='col-lg-3 col-sm-6 col-s-6 col-12'>ID: {user.id}</p>
            <p className='col-lg-3 col-sm-6 col-s-6 col-12'>Admin: {admin_str}</p>
          </div>
          <div className='row spell'>
            {view_back()}
            {allow_edit()}
            {allow_delete()}
          </div>
      </div>
    </section>
  ); 
}