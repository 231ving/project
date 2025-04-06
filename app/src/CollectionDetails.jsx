import React from 'react'
import { useParams } from 'react-router-dom'
import Collection from './Collection'

export default function CollectionDetails({ collections, loading = false, message, onViewCollection = f => f, onCopyCollection = f => f, onEditCollection = f => f, onDeleteCollection = f => f, update = f => f  }) {

  let params = useParams()
  let id = params.id
  let collection = collections.find((item) => item.id === Number(id))

  const body = collection ?  <Collection {...collection} onViewClicked={() => onViewCollection(collection)} onCopyClicked={() => onCopyCollection(collection)} onEditClicked={() => onEditCollection(collection)} onDeleteClicked={() => onDeleteCollection(collection)} /> : <span>Collection {id} not found.</span>
  
  return (
    <div>
      <h1>Collection Details</h1>
      {body}
    </div>

  )
}