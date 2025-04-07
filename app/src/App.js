import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react'
import './App.css'
import SpellList from './SpellListView.js'
import SpellAPI from './SpellAPI.js'
import SpellModel from './SpellModel.js'
import NewSpellForm from './NewSpellForm.jsx'
import SearchSpellForm from './searchSpellForm.jsx'
import SpellDetails from './SpellDetails.jsx'

import CollectionList from './CollectionListView.js'
import CollectionAPI from './CollectionAPI.js'
import CollectionModel from './CollectionModel.js'
import CollectionDetails from './CollectionDetails.jsx'
import NewCollectionForm from './NewCollectionForm.jsx'

import UserList from './UserListView.js'
import UserAPI from './UserAPI.js'
import User from './UserModel.js'
import UserDetails from './UserDetails.jsx'
import LoginPage from './loginPage.jsx'

import { Routes, Route, useLocation } from 'react-router-dom'
import {
  NotFound,
  About,
  Contact,
  Home,
  NavBar
} from './Navigation.js'

// Currently CRUD is using static inputs
// Having trouble dynamically adding input boxes and re-rendering upon change

const defaultSpell = new SpellModel({})
const defaultCollection = new CollectionModel({})
const defaultUser = new User({})

function SpellCollections(props) {
  const [currentSpells, setSpells] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [spellToEdit, setSpellToEdit] = useState(defaultSpell)
  const [currentSpellIndex, setSpellIndex] = useState(0);

  const [currentCollections, setCollections] = useState([]);
  const [collectionToEdit, setCollectionToEdit] = useState(defaultCollection)
  const [currentCollectionIndex, setCollectionIndex] = useState(0);

  const [currentUsers, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(defaultUser)
  const [currentUserIndex, setUserIndex] = useState(0);
  const [currUser, setUser] = useState([]);

  const [currHistory, setHistory] = useState([]);

  let fetchSpells = () => {
    setLoading(true)

    SpellAPI.fetchSpells()
      .then(data => {
        data.forEach((spell => setSpellIndex(spell.id)))
      setMessage(undefined)
      setSpells(data)
      setLoading(false)
    }).catch(problem => {
      setLoading(false)
      setMessage("Unable to load spells from the server.")
      console.log("Problem when calling SpellAPI.fetchSpells()")
    })
  }

  let fetchCollections = () => {
    setLoading(true)
    
    CollectionAPI.fetchCollections()
      .then(data => {
        data.forEach((collection => setCollectionIndex(collection.id)))
      setMessage(undefined)
      setCollections(data)
      setLoading(false)
    }).catch(problem => {
      setLoading(false)
      setMessage("Unable to load collections from the server.")
      console.log("Problem when calling CollectionAPI.fetchCollections()")
    })
  }

  let fetchUsers = () => {
    setLoading(true)
    
    UserAPI.fetchUsers()
      .then(data => {
        data.forEach((user => setUserIndex(user.id)))
      setMessage(undefined)
      setUsers(data)
      setLoading(false)
    }).catch(problem => {
      setLoading(false)
      setMessage("Unable to load users from the server.")
      console.log("Problem when calling CollectionAPI.fetchCollections()")
    })
  }

  let fetchSearchSpell = (spell) => {
    setLoading(true)

    SpellAPI.fetchsearchSpells(spell)
      .then(data => {
        data.forEach((spell => setSpellIndex(spell.id)))
      setMessage(undefined)
      setSpells(data)
      setLoading(false)
    }).catch(problem => {
      setLoading(false)
      setMessage("Unable to load spells from the server.")
      console.log("Problem when calling SpellAPI.fetchsearchSpells()")
    })
  }

  let fetchSearchCollection = (collection) => {
    setLoading(true)

    CollectionAPI.fetchsearchCollections(collection)
      .then(data => {
        data.forEach((collection => setCollectionIndex(collection.id)))
      setMessage(undefined)
      setCollections(data)
      setLoading(false)
    }).catch(problem => {
      setLoading(false)
      setMessage("Unable to load collections from the server.")
      console.log("Problem when calling CollectionAPI.fetchsearchCollections()")
    })
  }

  let fetchSearchUser = (user) => {
    setLoading(true)

    UserAPI.fetchsearchUsers(user)
      .then(data => {
        data.forEach((user => setUserIndex(user.id)))
      setMessage(undefined)
      setUsers(data)
      setLoading(false)
    }).catch(problem => {
      setLoading(false)
      setMessage("Unable to load users from the server.")
      console.log("Problem when calling UserAPI.fetchsearchUsers()")
    })
  }

  const finishSubmitSpell = (newSpells) => {
    setSpellToEdit(defaultSpell)
    setEditMode(false)
    setSpells(newSpells)
  }

  const finishSubmitCollection = (newCollections) => {
    setCollectionToEdit(defaultCollection)
    setEditMode(false)
    setCollections(newCollections)
  }

  const finishSubmitUser = (newUsers) => {
    setUserToEdit(defaultUser)
    setUsers(newUsers)
  }

  const submitSpell = (event) => {
    console.log(event)
    event.preventDefault()
    let testSpell = new SpellModel(spellToEdit)
    if (testSpell.isValid()) {
      if (editMode) {
        console.log('In edit mode.')
        SpellAPI.modifySpell(spellToEdit).then(data => {
          console.log("Received data from modify spell post")
          console.log(data)
          let newSpells = currentSpells.map( (item) => item.id === spellToEdit.id ? spellToEdit : item)
          finishSubmitSpell(newSpells)
        })
      } else {
        console.log("In 'new spell' mode.")
        spellToEdit.id = currentSpellIndex
        SpellAPI.addSpell(spellToEdit).then( data => {
          console.log("Received data from new spell post")
          console.log(data)
          spellToEdit.id = data.id

          let newSpells = [spellToEdit, ...currentSpells]
          finishSubmitSpell(newSpells)
        }).catch( data => {
          console.log('Problem saving new spell')
          console.log(data)
          finishSubmitSpell(currentSpells)
        })
      }
    } else {
      console.log('Spell is not valid')
      let currSpell = new SpellModel(spellToEdit)
      currSpell.isValid()
      console.log(currSpell.errors)
      setSpellToEdit(currSpell)
    }
  }

  const submitCollection = (event) => {
    console.log(event)
    event.preventDefault()
    let testCollection = new CollectionModel(collectionToEdit)
    if (testCollection.isValid()) {
      if (editMode) {
        console.log('In edit mode.')
        CollectionAPI.modifyCollection(collectionToEdit).then(data => {
          console.log("Received data from modify collection post")
          console.log(data)
          let newCollections = currentCollections.map( (item) => item.id === collectionToEdit.id ? collectionToEdit : item)
          finishSubmitCollection(newCollections)
        })
      } else {
        console.log("In 'new collection' mode.")
        collectionToEdit.id = currentCollectionIndex
        CollectionAPI.addCollection(collectionToEdit).then( data => {
          console.log("Received data from new collection post")
          console.log(data)
          collectionToEdit.id = data.id

          let newCollections = [collectionToEdit, ...currentCollections]
          finishSubmitCollection(newCollections)
        }).catch( data => {
          console.log('Problem saving new collection')
          console.log(data)
          finishSubmitCollection(currentCollections)
        })
      }
    } else {
      console.log('Collection is not valid')
      let currCollection = new CollectionModel(collectionToEdit)
      currCollection.isValid()
      console.log(currCollection.errors)
      setCollectionToEdit(currCollection)
    }
  }

  const submitUser = (event) => {
    console.log(event)
    event.preventDefault()
    console.log(userToEdit)
    let testUser = new User(userToEdit)
    if (testUser.isValid()) {
      if (editMode && currUser) {
        console.log('In edit account mode.')
        UserAPI.modifyUser(userToEdit).then(data => {
          console.log("Received data from modify user post")
          console.log(data)
          let newUsers = currentUsers.map( (item) => item.id === userToEdit.id ? userToEdit : item)
          finishSubmitUser(newUsers)
        })
      } else {
        console.log("In 'new user' mode.")
        userToEdit.id = currentUserIndex
        UserAPI.addUser(userToEdit).then( data => {
          console.log("Received data from new user post")
          console.log(data)
          userToEdit.id = data.id

          let newUsers = [userToEdit, ...currentUsers]
          finishSubmitUser(newUsers)
        }).catch( data => {
          console.log('Problem saving new user')
          console.log(data)
          finishSubmitUser(currentUsers)
        })
      }
    } else {
      console.log('Account is not valid')
      let currentUser = new User(userToEdit)
      currentUser.isValid()
      console.log(currentUser.errors)
      setUserToEdit(currentUser)
    }
  }

  const updateFormDataSpell = (spell) => {
    setSpellToEdit(spell)
  }

  const updateFormDataCollection = (collection) => {
    setCollectionToEdit(collection)
  }

  const updateFormDataUser = (user) => {
    setUserToEdit(user)
  }

  const viewSpell = (spell) => {
    console.log('Placeholder for Single Page View')
  }

  const viewCollection = (collection) => {
    console.log('Placeholder for Single Page View')
  }

  const viewUser = (user) => {
    console.log('Placeholder for Single Page View')
  }

  const copySpell = (spell) => {
    setSpellToEdit(spell)
    setEditMode(false)
  }

  const copyCollection = (collection) => {
    setCollectionToEdit(collection)
    setEditMode(false)
  }

  const editSpell = (spell) => {
    setSpellToEdit(spell)
    setEditMode(true)
  }

  const editCollection = (collection) => {
    setCollectionToEdit(collection)
    setEditMode(true)
  }

  const editUser = (user) => {
    setUserToEdit(user)
    setEditMode(true)
  }

  const cancelCopySpell = (spell) => {
    setSpellToEdit(spell)
  }

  const cancelEditSpell = (spell) => {
    setSpellToEdit(defaultSpell)
    setEditMode(false)
  }

  const cancelEditCollection = (collection) => {
    setCollectionToEdit(defaultCollection)
    setEditMode(false)
  }

  const cancelEditUser = (user) => {
    setUserToEdit(defaultUser)
    setEditMode(false)
  }

  const logout = () => {
    setUser([])
  }

  const login = (user) => {
    UserAPI.fetchsearchUsers(user)
  }

  const deleteSpell = (spell) => {
    SpellAPI.deleteSpell(spell)
    let newSpells = currentSpells.filter(item => item.id !== spell.id)
    finishSubmitSpell(newSpells)
  }

  const deleteCollection = (collection) => {
    CollectionAPI.deleteCollection(collection)
    let newCollections = currentSpells.filter(item => item.id !== collection.id)
    finishSubmitCollection(newCollections)
  }

  const deleteUser = (user) => {
    UserAPI.deleteUser(user)
    let newUsers = currentUsers.filter(item => item.id !== user.id)
    finishSubmitUser(newUsers)
  }

  const searchSpell = (spell) => {
    setEditMode(false)
    fetchSearchSpell(spell)
  }

  const searchCollection = (collection) => {
    setEditMode(false)
    fetchSearchCollection(collection)
  }

  const searchUser = (user) => {
    setEditMode(false)
    fetchSearchUser(user)
  }

  const resetFilters = () => {
    setSpellToEdit(defaultSpell)
    setCollectionToEdit(defaultCollection)
    setUserToEdit(defaultUser)
    setEditMode(false)
    fetchSpells()
    fetchCollections()
    fetchUsers()
  }

  const setNewHistory = (spell) => {
    let history = [[spell.id, spell.name]]
    currHistory.forEach(element => {
      history.push(element)
    })
    if (history.length > 5) {
      history.pop()
    }
    setHistory(history)
  }

  useEffect(fetchSpells, [])
  useEffect(fetchCollections, [])
  useEffect(fetchUsers, [])

  return <div className='spells' >
    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'></meta>
    <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <Home currhistory={currHistory} spells={currentSpells} loading={loading} message={message} onSetHistoryClicked={setNewHistory} />
          </>}
        />
        <Route path="/home" element={
          <>
            <Home currhistory={currHistory} spells={currentSpells} loading={loading} message={message} onSetHistoryClicked={setNewHistory} />
          </>}
        />
        <Route path="/spells" element={
          <>
            <SearchSpellForm editMode={editMode} spellToEdit={spellToEdit} onUpdate={updateFormDataSpell} onSubmit={submitSpell} onCancelEdit={cancelEditSpell} onSearch={searchSpell} onResetFilter={resetFilters}/>
            <SpellList spells={currentSpells} loading={loading} message={message} onSetHistory={setNewHistory} onCopySpell={copySpell} onEditSpell={editSpell} onDeleteSpell={deleteSpell} />
          </>}
        />
        <Route path="/spells/:id" element={
          <>
            <SpellDetails spells={currentSpells} loading={loading} message={message} onSetHistory={setNewHistory} onCopySpell={copySpell} onEditSpell={editSpell} onDeleteSpell={deleteSpell} /> 
          </>}
        />
        <Route path="/spells/:id/edit" element={
          <>
            <NewSpellForm editMode={editMode} spellToEdit={spellToEdit} onUpdate={updateFormDataSpell} onSubmit={submitSpell} onCancelEdit={cancelEditSpell} onCancelCopy={cancelCopySpell} onSearch={searchSpell} onResetFilter={resetFilters}/>
          </>}
        />
        <Route path="/spells/new" element={
          <>
            <NewSpellForm editMode={editMode} spellToEdit={spellToEdit} onUpdate={updateFormDataSpell} onSubmit={submitSpell} onCancelEdit={cancelEditSpell} onCancelCopy={cancelCopySpell} onSearch={searchSpell} onResetFilter={resetFilters}/>
          </>}
        />
        <Route path="/collections" element={
          <>
            <NewCollectionForm editMode={editMode} collectionToEdit={collectionToEdit} onUpdate={updateFormDataCollection} onSubmit={submitCollection} onCancelEdit={cancelEditCollection} onSearch={searchCollection} onResetFilter={resetFilters}/>
            <CollectionList collections={currentCollections} loading={loading} message={message} onViewCollection={viewCollection} onCopyCollection={copyCollection} onEditCollection={editCollection} onDeleteCollection={deleteCollection} /> 
          </>}
         />
        <Route path="/collections/:id" element={
          <>
            <NewCollectionForm editMode={editMode} collectionToEdit={collectionToEdit} onUpdate={updateFormDataCollection} onSubmit={submitCollection} onCancelEdit={cancelEditCollection} onSearch={searchCollection} onResetFilter={resetFilters}/>
            <CollectionDetails collections={currentCollections} loading={loading} message={message} onViewCollection={viewCollection} onCopyCollection={copyCollection} onEditCollection={editCollection} onDeleteCollection={deleteCollection} />
          </>}
        />
        <Route path="/collections/:id/edit" element={
          <>
            <NewCollectionForm editMode={editMode} collectionToEdit={collectionToEdit} onUpdate={updateFormDataCollection} onSubmit={submitCollection} onCancelEdit={cancelEditCollection} onSearch={searchCollection} onResetFilter={resetFilters}/>
          </>}
        />
        <Route path="/users" element={
          <>
            <LoginPage editMode={editMode} currUser={currUser} userToEdit={userToEdit} onLogout={logout} onUpdate={updateFormDataUser} onSubmit={submitUser} onCancelEdit={cancelEditUser} onSearch={searchUser} onResetFilter={resetFilters}/>
            <UserList users={currentUsers} loading={loading} message={message} onViewUser={viewUser} onEditUser={editUser} onDeleteUser={deleteUser} />
          </>}
         />
        <Route path="/users/:id" element={
          <>
            <LoginPage editMode={editMode} currUser={currUser} userToEdit={userToEdit} onLogout={logout} onUpdate={updateFormDataUser} onSubmit={submitUser} onCancelEdit={cancelEditUser} onSearch={searchUser} onResetFilter={resetFilters}/>
            <UserDetails users={currentUsers} loading={loading} message={message} onViewUser={viewUser} onEditUser={editUser} onDeleteUser={deleteUser} />
          </>}
         />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={
          <>
            <LoginPage editMode={editMode} currUser={currUser} userToEdit={userToEdit} onLogout={logout} onUpdate={updateFormDataUser} onSubmit={submitUser} onCancelEdit={cancelEditUser} onSearch={searchUser} onResetFilter={resetFilters}/>
          </>}
        />
      </Routes>
    </div>
}

export default SpellCollections;
