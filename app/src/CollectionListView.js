// Name: Phuc Le

import React from "react";
import Collection from "./Collection.jsx";

export default function CollectionList({ collections = [], loading = false, message, onViewCollection = f => f, onCopyCollection = f => f, onEditCollection = f => f, onDeleteCollection = f => f, update = f => f }) {
  if (message) {
    return <div>{message}</div>
  } else if (loading) {
    return <div>Loading ......</div>;
  } else if(!collections.length) {
    return <div>No Collections Listed.</div>;
  } 
  return (
    <div>
      {
        collections.map(collection => <Collection key={collection.id} {...collection} onViewClicked={() => onViewCollection(collection)} onCopyClicked={() => onCopyCollection(collection)} onEditClicked={() => onEditCollection(collection)} onDeleteClicked={() => onDeleteCollection(collection)} />)
      }
    </div>
  );
}