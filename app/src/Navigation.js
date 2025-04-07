// Name: Phuc Le

import React from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'

export function Home( {currhistory, spells, loading, message, onSetHistoryClicked = f => f} ) {
  const navigate = useNavigate()
  let random_int = Math.round(Math.random() * spells.length)
  if (message) {
    return <div>{message}</div>
  } else if (loading) {
    return <div>Loading ......</div>;
  } else if(!spells.length) {
    return <div>No Spells Listed.</div>;
  } 
  function show_history() {
    if (currhistory.length !== 0) {
      return <div className='col-12'>Spell History:
            <ul className='col-12'>
              {currhistory.map(item => <li onClick={() => navigate(`/spells/${item[0]}`)}>{item[1]}</li>)}
            </ul>
          </div>
    } else {
      return <div className='col-12'>No Recently Shown Spells</div>
    }
  }

  function onView(spell) {
    onSetHistoryClicked(spell)
    navigate(`/spells/${spell.id}`)
  }

  return <div>
    <h1>[Spell Database]</h1>
    <div className='container history'>
      <div className='row'>
        {show_history()}
      </div>
    </div>
    <div className='container random_spell'>
      <div className='row'>
        <div className='col-12'>Random Spell: <div onClick={() => onView(spells[random_int])}>Click Here To View a Random Spell!<span>({spells[random_int].name})</span></div></div>
      </div>
    </div>
  </div>
}

export function About() {
  return (
    <div>
      <h1>About Spell Database</h1>
            A basic database meant to store information about spells.
    </div>
  )
}


export function Contact() {
  return (
    <div>
      <h1>Contact Me at: XXX@gmail.com</h1>
    </div>
  )
}

export function NotFound() {
  let location = useLocation()
  return (
    <div>
      <h1>Path {location.pathname} is not valid </h1>
    </div>
  )
}

export function NavBar() {
  return (
    <nav id='navBar'>
            Contents: 
      <Link to="home">Home</Link>
      <Link to="spells">Spells</Link>
      <Link to="collections">Collections</Link>
      <Link to="about">About</Link>
      <Link to="contact">Contact Us</Link>
      <Link to="users">Users</Link>
      <Link to="login">Login/Sign Up</Link>
    </nav>
  )
}