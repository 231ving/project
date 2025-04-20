import React from 'react'
import { useParams } from 'react-router-dom'
import User from './User'
import Collection from './Collection'
import UserAPI from './UserAPI.js'
import Spell from "./Spell";

export default function UserDetails({ users, spells, collections, loading = false, message, currUser, onEditUser = f => f, onDeleteUser = f => f, onSetSpellHistoryClicked = f => f, onEditSpell = f => f, onCopySpell = f => f, onDeleteSpell = f => f, onSetCollectionHistoryClicked = f => f, onEditCollection = f => f, onCopyCollection = f => f, onDeleteCollection = f => f, update = f => f }) {
  const [userSpells, setUserSpells] = React.useState()
  const [userCollections, setUserCollections] = React.useState()

  let params = useParams()
  let id = params.id
  let user = users.find((item) => item.id === Number(id))

  const body = user ?  <User {...user} currUser={currUser} onEditClicked={() => onEditUser(user)} onDeleteClicked={() => onDeleteUser(user)} /> : <span>User {id} not found.</span>

  let fetchSpellsByUser = () => {
      UserAPI.fetchSpellsByUser(user).then(data => {
      setUserSpells(data)
    }).catch(problem => {
      console.log("Problem when calling UserAPI.fetchSpellsByUser()")
    })
  }

  let fetchCollectionsByUser = () => {
      UserAPI.fetchCollectionsByUser(user).then(data => {
      setUserCollections(data)
    }).catch(problem => {
      console.log("Problem when calling UserAPI.fetchCollectionsByUser()")
    })
  }
  
  function show_spells() {
    if (userSpells) {
      if (userSpells.length !== spells.length) {
        return <section>
          <h1>User Spells</h1>
          {userSpells.map(spell => <Spell key={spell.id} {...spell} currUser={currUser} onSetSpellHistoryClicked={() => onSetSpellHistoryClicked(spell)} onCopyClicked={() => onCopySpell(spell)} onEditClicked={() => onEditSpell(spell)} onDeleteClicked={() => onDeleteSpell(spell)} />)}
        </section>
      } else {
        return <h1>No Spells</h1>
      }
    }
  }

  function show_collections() {
    if (userCollections) {
      if (userCollections.length !== collections.length) {
        return <section>
          <h1>User Collections</h1>
          {userCollections.map(collection => <Collection key={collection.id} {...collection} currUser={currUser} onSetCollectionHistoryClicked={() => onSetCollectionHistoryClicked(collection)} onCopyClicked={() => onCopyCollection(collection)} onEditClicked={() => onEditCollection(collection)} onDeleteClicked={() => onDeleteCollection(collection)} />)}
        </section>
      } else {
        return <h1>No Collections</h1>
      }
    }
  }

  React.useEffect(fetchSpellsByUser, [user])
  React.useEffect(fetchCollectionsByUser, [user])

  return (
    <div>
      <h1>User Details</h1>
      {body}
      {show_spells()}
      {show_collections()}
    </div>

  )
}