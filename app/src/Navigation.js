// Name: Phuc Le

import React from 'react'
import { useLocation, Link } from 'react-router-dom'

export function Home() {
  return (
    <div>
      <h1>[Spell Database]</h1>
    </div>
  )
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
      <Link to="about">About</Link>
      <Link to="contact">Contact Us</Link>
    </nav>
  )
}