// Name: Phuc Le

import { useLocation, useNavigate } from 'react-router-dom'

export default function Collection({ id, name, description, source_name, source_link, public_status, modifiable, errors, currUser, onSetCollectionHistoryClicked = f => f, onEditClicked = f => f, onCopyClicked = f => f, onDeleteClicked = f => f}) {
    let collection = {
      id: id,
      name: name,
      description: description,
      source_name: source_name,
      source_link: source_link,
      public_status: public_status,
      modifiable: modifiable,
      errors: errors
    }
    let public_status_str = 'True'
    if (collection.public_status === 0) {
      public_status_str = 'False'
    }
    let modifiable_str = 'True'
    if (collection.modifiable === 0) {
      modifiable_str = 'False'
    }

    function error_log()  {
      if (errors.length !== 0) {
          return <div>Error List:
              <ul>
                  {errors.map((item, key) => (
                  <li>{item}</li>
                  ))}
              </ul>
          </div>
      }
  }

    const navigate = useNavigate()
    let location = useLocation()
    let tokens = location.pathname.split('/')
    let prev_page = tokens.slice(0, -1).join('/')

    function allow_view(){
      if (currUser.username === collection.source_name || collection.public_status === 1 || currUser.admin === 1) {
        return <button className='col-s-3 col-6' onClick={() => onView(collection)}>View</button>
      } else {
        return <div className='col-s-3 col-6'>View Unavailable</div>
      }
    }

    function allow_edit(){
      if (currUser.username === collection.source_name || collection.modifiable === 1 || currUser.admin === 1) {
        return <button className='col-s-3 col-6' onClick={() => onEdit(collection)}>Edit</button>
      } else {
        return <div className='col-s-3 col-6'>Edit Unavailable</div>
      }
    }

    function allow_quick_copy(){
      if (currUser.username === collection.source_name || collection.modifiable === 1 || currUser.admin === 1) {
        return <button className='col-s-3 col-6' onClick={() => onCopy(collection)}>Quick Copy</button>
      } else {
        return <div className='col-s-3 col-6'>Quick Copy Unavailable</div>
      }
    }

    function allow_delete(){
      if (currUser.username === collection.source_name || currUser.admin === 1) {
        return <button className='col-s-3 col-6' onClick={() => onDeleteClicked(collection)}>Delete</button>
      } else {
        return <div className='col-s-3 col-6'>Delete Unavailable</div>
      }
    }

    function allow_connections() {
      if (currUser.username === collection.source_name || currUser.admin === 1) {
        return <button className='col-s-3 col-6'onClick={() => onConnection()}>Manage Connections</button>
      } else {
        return <div className='col-s-3 col-6'>Manage Connections Unavailable</div> 
      }
    }

    function buttons() {
      if (location.pathname !== `/collections/${id}`) {
        return <section className='row'>
            {allow_view()}
            {allow_edit()}
            {allow_quick_copy()}
            {allow_delete()}
            {allow_connections()}
          </section>
      } else {
        return <section className='row'>
            {allow_edit()}
            {allow_quick_copy()}
            {allow_delete()}
            {allow_connections()}
            <button className='col-s-3 col-6' onClick={() => navigate(prev_page)}>Back</button>
          </section>
      }
    }

    function onView(collection) {
      onSetCollectionHistoryClicked(collection)
      navigate(`/collections/${collection.id}`)
    }

    function onConnection() {
      if (currUser.username) {
        onEditClicked(collection)
        navigate(`/collections/${collection.id}/connections`)
      } else {
        navigate(`/login`)
      }
    }

    function onCopy(collection) {
      if (currUser.username) {
        onCopyClicked(collection)
        navigate(`/collections/${collection.id}/edit`)
      } else {
        navigate(`/login`)
      }
    }

    function onEdit(collection) {
      if (currUser.username) {
        onEditClicked(collection)
        navigate(`/collections/${collection.id}/edit`)
      } else {
        navigate(`/login`)
      }
    } 

    return (
      <section className='single_spell'>
        <h1>{collection.name}</h1>
        <div className='container'>
            <div className='row spell'>
              <p className='col-lg-3 col-sm-6 col-s-6 col-12'>Collection ID: {collection.id}</p>
              <p className='col-lg-3 col-sm-6 col-s-6 col-12'>Publicly Viewable: {public_status_str}</p>
              <p className='col-lg-3 col-sm-6 col-s-6 col-12'>Quick Copyable: {modifiable_str}</p>
              <p className='col-lg-3 col-sm-6 col-s-6 col-12'>Source: {collection.source_name}</p>
              <p className='col-12'>Source Link: {collection.source_link}</p>
              <p className='col-12'>Collection Description: {collection.description}</p>
              <p className='spell'></p>
              <p>{error_log()}</p>
              {buttons()}
            </div>
        </div>
      </section>
    ); 
  }