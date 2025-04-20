import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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
import SearchCollectionForm from './searchCollectionForm.jsx'
import CollectionsConnectionForm from './CollectionConnectionForm.jsx'

import UserList from './UserListView.js'
import UserAPI from './UserAPI.js'
import User from './UserModel.js'
import UserDetails from './UserDetails.jsx'
import SearchUserForm from './searchUserForm.jsx'
import LoginPage from './loginPage.jsx'
import NewUserForm from './NewUserForm.jsx'

import ConnectionAPI from './ConnectionAPI.js'

import { Routes, Route, useNavigate } from 'react-router-dom'
import {
  NotFound,
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
  //Spells by user

  const [currentCollections, setCollections] = useState([]);
  const [collectionToEdit, setCollectionToEdit] = useState(defaultCollection)
  const [currentCollectionIndex, setCollectionIndex] = useState(0);
  //Collections by user

  const [currentUsers, setUsers] = useState([]);
  const [userToEdit, setUserToEdit] = useState(defaultUser)
  const [currentUserIndex, setUserIndex] = useState(0);
  const [loginMode, setloginMode] = useState(true);

  if (localStorage.getItem('user') === null) {
    localStorage.setItem('user', JSON.stringify({
      username: "", email: "", password: "", admin: 0
    }))
  }

  const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [LoggedIn, setLoggedInMode] = useState(currUser.username ? true : false);

  const [currSpellHistory, setSpellHistory] = useState([]);
  const [currCollectionHistory, setCollectionHistory] = useState([]);

  const navigate = useNavigate()

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
        SpellAPI.modifySpell(spellToEdit, currUser).then(data => {
          console.log("Received data from modify spell post")
          console.log(data)
          let newSpells = currentSpells.map( (item) => item.id === spellToEdit.id ? spellToEdit : item)
          finishSubmitSpell(newSpells)
          navigate(`/spells/${data.id}`)
          fetchSpells()
        })
      } else {
        console.log("In 'new spell' mode.")
        spellToEdit.id = currentSpellIndex
        SpellAPI.addSpell(spellToEdit, currUser).then( data => {
          console.log("Received data from new spell post")
          console.log(data)
          spellToEdit.id = data.id

          let newSpells = [spellToEdit, ...currentSpells]
          finishSubmitSpell(newSpells)
          navigate(`/spells/${data.id}`)
          fetchSpells()
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
        CollectionAPI.modifyCollection(collectionToEdit, currUser).then(data => {
          console.log("Received data from modify collection post")
          console.log(data)
          let newCollections = currentCollections.map( (item) => item.id === collectionToEdit.id ? collectionToEdit : item)
          finishSubmitCollection(newCollections)
          navigate(`/collections/${data.id}`)
          fetchCollections()
        })
      } else {
        console.log("In 'new collection' mode.")
        collectionToEdit.id = currentCollectionIndex
        CollectionAPI.addCollection(collectionToEdit, currUser).then( data => {
          console.log("Received data from new collection post")
          console.log(data)
          collectionToEdit.id = data.id

          let newCollections = [collectionToEdit, ...currentCollections]
          finishSubmitCollection(newCollections)
          navigate(`/collections/${data.id}`)
          fetchCollections()
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
      if (editMode && localStorage.getItem('user')) {
        console.log('In edit account mode.')
        UserAPI.modifyUser(userToEdit, currUser).then(data => {
          console.log("Received data from modify user post")
          console.log(data)
          let newUsers = currentUsers.map( (item) => item.id === userToEdit.id ? userToEdit : item)
          // Gotta add functionality to not switch accounts when admin
          finishSubmitUser(newUsers)
          if (currUser.id === userToEdit.id) {
            localStorage.setItem('user', JSON.stringify(data))
            setUserToEdit(data)
            setCurrUser(data)
            setLoggedInMode(true)
          } else {
            setUserToEdit(data)
            setLoggedInMode(true)
          }
          navigate(`/users/${data.id}`)
          fetchUsers()
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
          navigate(`/users/${data.id}`)
          fetchUsers()
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

  const submitConnection = (connection) => {
    console.log("In new connection mode.")
    console.log(connection.spell, connection.collection)
    ConnectionAPI.addConnection(connection, currUser).then(data => {
      console.log("Received data from create connection post")
      console.log(data)
    }).catch( data => {
      console.log('Problem saving new connection')
      console.log(data)
    })
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
    console.log(user)
    setUserToEdit(user)
    setEditMode(true)
  }

  const cancelCopySpell = (spell) => {
    setSpellToEdit(defaultSpell)
  }

  const cancelCopyCollection = (collection) => {
    setCollectionToEdit(defaultCollection)
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

  const logout = (event) => {
    setLoggedInMode(false)
    localStorage.setItem('user', JSON.stringify({
      username: "", email: "", password: "", admin: 0
    }))
    setUserToEdit(defaultUser)
    setCurrUser(defaultUser)
  }

  const login = (user) => {
    if (loginMode) {
      UserAPI.loginUser(userToEdit).then((data) => {
        localStorage.setItem('user', JSON.stringify(data))
        setUserToEdit(data)
        setCurrUser(data)
        setLoggedInMode(true)
        setloginMode(true)
      }).catch(error => {
        console.log('Error of:', error)
      })
    }
  }

  const signup = (user) => {
    console.log(user)
    if (!loginMode) {
      UserAPI.addUser(user).then(data => {
        setloginMode(true)
        setLoggedInMode(false)
        setUserToEdit(data)
        fetchUsers()
      }).catch(error => {
        console.log('Error of:', error)
      })
    }
  }

  const switchLoginMode = () => {
    setUserToEdit(defaultUser)
    if (loginMode) {
      setloginMode(false)
    } else {
      setloginMode(true)
    }
  }

  const deleteSpell = (spell) => {
    SpellAPI.deleteSpell(spell, currUser)
    let newSpells = currentSpells.filter(item => item.id !== spell.id)
    finishSubmitSpell(newSpells)
    navigate('/spells')
    fetchSpells()
  }

  const deleteCollection = (collection) => {
    CollectionAPI.deleteCollection(collection, currUser)
    let newCollections = currentCollections.filter(item => item.id !== collection.id)
    finishSubmitCollection(newCollections)
    navigate('/collections')
    fetchCollections()
  }

  const deleteUser = (target) => {
    UserAPI.deleteUser(target, currUser)
    let newUsers = currentUsers.filter(item => item.id !== target.id)
    if (currUser.id === target.id) {
      localStorage.setItem('user', JSON.stringify({
        username: "", email: "", password: "", admin: 0
      }))
      setCurrUser(defaultUser)
      setLoggedInMode(false)
      setloginMode(true)
      navigate('/home')
    }
    finishSubmitUser(newUsers)
    fetchUsers()
  }

  const deleteConnection = (connection) => {
    console.log('Attempting to delete connection')
    console.log(connection.spell, connection.collection)
    ConnectionAPI.deleteConnection(connection, currUser)
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

  const setNewSpellHistory = (spell) => {
    let history = [[spell.id, spell.name]]
    currSpellHistory.forEach(element => {
      history.push(element)
    })
    if (history.length > 5) {
      history.pop()
    }
    setSpellHistory(history)
  }

  const setNewCollectionHistory = (collection) => {
    let history = [[collection.id, collection.name]]
    currCollectionHistory.forEach(element => {
      history.push(element)
    })
    if (history.length > 5) {
      history.pop()
    }
    setCollectionHistory(history)
  }

  useEffect(fetchSpells, [])
  useEffect(fetchCollections, [])
  useEffect(fetchUsers, [])

  return <div className='spells'>
    <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'></meta>
    <NavBar currUser={currUser} loggedIn={LoggedIn} />
      <Routes>
        <Route path="/" element={
            <Home currspellhistory={currSpellHistory} currUser={currUser} spells={currentSpells} currcollectionhistory={currCollectionHistory} collections={currentCollections} loading={loading} message={message} onSetSpellHistoryClicked={setNewSpellHistory} onSetCollectionHistoryClicked={setNewCollectionHistory} />
          }
        />
        <Route path="/home" element={
            <Home currspellhistory={currSpellHistory} currUser={currUser} spells={currentSpells} currcollectionhistory={currCollectionHistory} collections={currentCollections} loading={loading} message={message} onSetSpellHistoryClicked={setNewSpellHistory} onSetCollectionHistoryClicked={setNewCollectionHistory} />
          }
        />
        <Route path="/spells" element={
          <>
            <SearchSpellForm editMode={editMode} spellToEdit={spellToEdit} onUpdate={updateFormDataSpell} onSubmit={submitSpell} onCancelEdit={cancelEditSpell} onSearch={searchSpell} onResetFilter={resetFilters}/>
            <SpellList spells={currentSpells} currUser={currUser} loading={loading} message={message} onSetSpellHistoryClicked={setNewSpellHistory} onCopySpell={copySpell} onEditSpell={editSpell} onDeleteSpell={deleteSpell} />
          </>}
        />
        <Route path="/spells/:id" element={
            <SpellDetails spells={currentSpells} currUser={currUser} loading={loading} message={message} onSetSpellHistoryClicked={setNewSpellHistory} onCopySpell={copySpell} onEditSpell={editSpell} onDeleteSpell={deleteSpell} /> 
          }
        />
        <Route path="/spells/:id/edit" element={
            <NewSpellForm editMode={editMode} currUser={currUser} spellToEdit={spellToEdit} onUpdate={updateFormDataSpell} onSubmit={submitSpell} onCancelEdit={cancelEditSpell} onCancelCopy={cancelCopySpell} onSearch={searchSpell} onResetFilter={resetFilters}/>
          }
        />
        <Route path="/spells/new" element={
            <NewSpellForm editMode={editMode} currUser={currUser} spellToEdit={spellToEdit} onUpdate={updateFormDataSpell} onSubmit={submitSpell} onCancelEdit={cancelEditSpell} onCancelCopy={cancelCopySpell} onSearch={searchSpell} onResetFilter={resetFilters}/>
          }
        />
        <Route path="/collections" element={
          <>
            <SearchCollectionForm editMode={editMode} collectionToEdit={collectionToEdit} onUpdate={updateFormDataCollection} onSubmit={submitCollection} onCancelEdit={cancelEditCollection} onSearch={searchCollection} onResetFilter={resetFilters}/>
            <CollectionList collections={currentCollections} currUser={currUser} loading={loading} message={message} onSetCollectionHistoryClicked={setNewCollectionHistory} onCopyCollection={copyCollection} onEditCollection={editCollection} onDeleteCollection={deleteCollection} /> 
          </>}
         />
        <Route path="/collections/:id" element={
            <CollectionDetails collections={currentCollections} currUser={currUser} spells={currentSpells} loading={loading} message={message} onSetCollectionHistoryClicked={setNewCollectionHistory} onSetSpellHistoryClicked={setNewSpellHistory} onCopySpell={copySpell} onEditSpell={editSpell} onDeleteSpell={deleteSpell} onCopyCollection={copyCollection} onEditCollection={editCollection} onDeleteCollection={deleteCollection} />
          }
        />
        <Route path="/collections/:id/edit" element={
            <NewCollectionForm editMode={editMode} currUser={currUser} collectionToEdit={collectionToEdit} onUpdate={updateFormDataCollection} onSubmit={submitCollection} onCancelEdit={cancelEditCollection} onCancelCopy={cancelCopyCollection} onSearch={searchCollection} onResetFilter={resetFilters}/>
          }
        />
        <Route path="/collections/new" element={
            <NewCollectionForm editMode={editMode} currUser={currUser} collectionToEdit={collectionToEdit} onUpdate={updateFormDataCollection} onSubmit={submitCollection} onCancelEdit={cancelEditCollection} onCancelCopy={cancelCopyCollection} onSearch={searchCollection} onResetFilter={resetFilters}/>
            }
        />
        <Route path="/collections/:id/connections" element={
            <CollectionsConnectionForm spells={currentSpells} collections={currentCollections} currUser={currUser} collectionToEdit={collectionToEdit} onUpdateCollection={updateFormDataCollection} onSubmit={submitConnection} onDelete={deleteConnection} />
          }
        />
        <Route path="/users" element={
          <>
            <SearchUserForm editMode={editMode} userToEdit={userToEdit} onUpdate={updateFormDataUser} onSubmit={submitUser} onCancelEdit={cancelEditUser} onSearch={searchUser} onResetFilter={resetFilters}/>
            <UserList users={currentUsers} currUser={currUser} spells={currentSpells} collections={currentCollections} loading={loading} message={message} onEditUser={editUser} onDeleteUser={deleteUser} />
          </>}
         />
        <Route path="/users/:id" element={
            <UserDetails users={currentUsers} currUser={currUser} spells={currentSpells} collections={currentCollections} loading={loading} message={message} onEditUser={editUser} onDeleteUser={deleteUser} />
          }
         />
         <Route path="/users/:id/edit" element={
            <NewUserForm editMode={editMode} loginMode={loginMode} loggedIn={LoggedIn} currUser={currUser} userToEdit={userToEdit} onUpdate={updateFormDataUser} onSubmit={submitUser} onCancelEdit={cancelEditUser}/>
          }
        />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={
            <LoginPage loginMode={loginMode} loggedIn={LoggedIn} currUser={currUser} userToEdit={userToEdit} onLogout={logout} onLogin={login} onSignUp={signup} onModeSwitch={switchLoginMode} onUpdate={updateFormDataUser} onSubmit={submitUser} onCancelEdit={cancelEditUser} onSearch={searchUser} onResetFilter={resetFilters}/>
          }
        />
      </Routes>
    </div>
}

export default SpellCollections;
