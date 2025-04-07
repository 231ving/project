// Name: Phuc Le

import { useLocation, useNavigate } from 'react-router-dom'

export default function Collection({ id, name, description, source_name, source_link, public_status, modifiable, errors, onViewClicked = f => f, onEditClicked = f => f, onCopyClicked = f => f, onDeleteClicked = f => f}) {
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

    let location = useLocation()
    const navigate = useNavigate()

    function view_back() {
      if (location.pathname !== `/collections/${id}`) {
        return <div className='col-s-3 col-6 view_back'><a href={`/collections/${collection.id}`} className='button'>View</a></div>
      } else {
        return <div className='col-s-3 col-6 view_back'><a href={`/collections`} className='button'>Back</a></div>
      }
    }

    function onCopy(collection) {
      onCopyClicked(collection)
      navigate(`/collections/${collection.id}/edit`)
    }

    function onEdit(collection) {
      onEditClicked(collection)
      navigate(`/collections/${collection.id}/edit`)
    }

    return (
      <section>
        <h1>{collection.name}</h1>
        <div className='container'>
            <div className='row spelldetails'> 
              <p className='col-lg-2 col-sm-3 col-s-4 col-3 spellname'>Collection Name: {collection.name}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Collection ID: {collection.id}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Source: {collection.source_name}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Source Link: {collection.source_link}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Publicly Viewable: {public_status_str}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Quick Copyable: {modifiable_str}</p>
              <p>{collection.errors}</p>
              <p className='col-12 spelldesc'>Collection Description: {collection.description}</p>
              {view_back()}
              <button className='col-s-3 col-6' onClick={() => onCopy(collection)}>Quick Copy</button>
              <button className='col-s-3 col-6' onClick={() => onEdit(collection)}>Edit</button>
              <button className='col-s-3 col-6' onClick={() => onDeleteClicked(collection)}>Delete</button>
            </div>
        </div>
      </section>
    ); 
  }