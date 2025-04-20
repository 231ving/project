// Name: Phuc Le

import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

export function Home( {currspellhistory, spells, currcollectionhistory, collections, loading, message, onSetSpellHistoryClicked = f => f, onSetCollectionHistoryClicked = f => f} ) {
  const navigate = useNavigate()
  let random_int_spell = Math.round(Math.random() * spells.length)
  let random_int_collection = Math.round(Math.random() * collections.length)
  if (message) {
    return <div>{message}</div>
  } else if (loading) {
    return <div>Loading ......</div>;
  } else if(!spells.length) {
    return <div>No Spells Listed.</div>;
  }
  function show_spellhistory() {
    if (currspellhistory.length !== 0) {
      return <div className='col-6'>Spell History:
            <ul className='2'>
              {currspellhistory.map(item => <li onClick={() => navigate(`/spells/${item[0]}`)}>{item[1]}</li>)}
            </ul>
          </div>
    } else {
      return <div className='col-6'>No Recently Shown Spells</div>
    }
  }

  function show_collectionhistory() {
    if (currcollectionhistory.length !== 0) {
      return <div className='col-6'>Collection History:
            <ul className='2'>
              {currcollectionhistory.map(item => <li onClick={() => navigate(`/collections/${item[0]}`)}>{item[1]}</li>)}
            </ul>
          </div>
    } else {
      return <div className='col-6'>No Recently Shown Collections</div>
    }
  }

  function onViewSpell(spell) {
    onSetSpellHistoryClicked(spell)
    navigate(`/spells/${spell.id}`)
  }

  function onViewCollection(collection) {
    onSetCollectionHistoryClicked(collection)
    navigate(`/collections/${collection.id}`)
  }

  function randoms() {
    if (spells.length > 0 && collections.length > 0) {
      return <div className='row'>
        <div className='col-6'>Random Spell: <div onClick={() => onViewSpell(spells[random_int_spell])}>Click Here To View a Random Spell!<span>({spells[random_int_spell].name})</span></div></div>
        <div className='col-6'>Random Collection: <div onClick={() => onViewCollection(collections[random_int_collection])}>Click Here To View a Random Collection!<span>({collections[random_int_collection].name})</span></div></div>
      </div>
    }
  }

  return <div>
    <h1>[Spell Database]</h1>
    <div className='container history'>
      <div className='row'>
        {show_spellhistory()}
        {show_collectionhistory()}
      </div>
    </div>
    <div className='container random_spell'>
      {randoms()}
    </div>
  </div>
}

export function NotFound() {
  let location = useLocation()
  return (
    <div>
      <h1>Path {location.pathname} is not valid </h1>
    </div>
  )
}

export function NavBar({ currUser, loggedIn }) {
  function check_logged_in() {
    if (loggedIn && currUser) {
      return <Link to={`/users/${currUser.id}`}>Profile</Link>
    }
  }
  return (<nav className="navbar navbar-expand-lg navbar-light" id='navBar'>
      <div>Content: </div>
      <div id="navbarSupportedContent">
        <Link to="home">Home</Link>
        <Link to="spells">Spells</Link>
        <Link to="collections">Collections</Link>
        <Link to="users">Users</Link>
        {check_logged_in()}
        <Link to="login">{loggedIn ? 'Logout' : 'Login/Signup' }</Link>
      </div>
    </nav>)
}
