// Name: Phuc Le

import React from "react";
import Collection from "./Collection.jsx";

export default function CollectionList({ collections = [], currUser, loading = false, message, onSetCollectionHistoryClicked = f => f, onCopyCollection = f => f, onEditCollection = f => f, onDeleteCollection = f => f, update = f => f }) {
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
        collections.filter(item => item.public_status === 1 || item.source_name === currUser.username || currUser.admin === 1).map(collection => <Collection key={collection.id} {...collection} currUser={currUser} onSetCollectionHistoryClicked={onSetCollectionHistoryClicked} onCopyClicked={() => onCopyCollection(collection)} onEditClicked={() => onEditCollection(collection)} onDeleteClicked={() => onDeleteCollection(collection)} />)
      }
    </div>
  );
}