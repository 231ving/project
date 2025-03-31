import { useState, useEffect } from 'react'
import './App.css'
import SpellList from './SpellListView.js'
import SpellAPI from './SpellAPI'
import SpellModel from './SpellModel.js'
import NewSpellForm from './NewSpellForm.jsx'
import { Routes, Route } from 'react-router-dom'
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

function SpellCollections(props) {
  const [currentSpells, setSpells] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [spellToEdit, setSpellToEdit] = useState(defaultSpell)
  const [currentSpellIndex, setSpellIndex] = useState(0);

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

  let fetchSearch = (spell) => {
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
      console.log("Problem when calling SpellAPI.fetchSearch()")
    })
  }

  const finishSubmit = (newSpells) => {
    setSpells(newSpells)
    setEditMode(false)
    setSpellToEdit(defaultSpell)
  }

  const submit = (event) => {
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
          finishSubmit(newSpells)
        })
      } else {
        console.log("In 'new spell' mode.")
        spellToEdit.id = currentSpellIndex
        SpellAPI.addSpell(spellToEdit).then( data => {
          console.log("Received data from new spell post")
          console.log(data)
          spellToEdit.id = data.id

          let newSpells = [spellToEdit, ...currentSpells]
          finishSubmit(newSpells)
        }).catch( data => {
          console.log('Problem saving new spell')
          console.log(data)
          finishSubmit(currentSpells)
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

  const updateFormData = (spell) => {
    setSpellToEdit(spell)
  }

  const viewSpell = (spell) => {
    console.log('Placeholder for Single Page View')
  }

  const copySpell = (spell) => {
    setSpellToEdit(spell)
    setEditMode(false)
  }

  const editSpell = (spell) => {
    setSpellToEdit(spell)
    setEditMode(true)
  }

  const cancelEdit = (spell) => {
    setSpellToEdit(defaultSpell)
    setEditMode(false)
  }

  const deleteSpell = (spell) => {
    SpellAPI.deleteSpell(spell)
    let newSpells = currentSpells.filter(item => item.id !== spell.id)
    finishSubmit(newSpells)
  }

  const searchSpell = (spell) => {
    setEditMode(false)
    fetchSearch(spell)
  }

  const resetFilters = () => {
    setSpellToEdit(defaultSpell)
    setEditMode(false)
    fetchSpells()
  }

  useEffect(fetchSpells, [])

  function Spells() {
    return <div>
      <NewSpellForm editMode={editMode} spellToEdit={spellToEdit} onUpdate={updateFormData} onSubmit={submit} onCancelEdit={cancelEdit} onSearch={searchSpell} onResetFilter={resetFilters}/>
      <SpellList spells={currentSpells} loading={loading} message={message} onViewSpell={viewSpell} onCopySpell={copySpell} onEditSpell={editSpell} onDeleteSpell={deleteSpell} />
    </div>
  }

  return <div className='spells' >
    <NavBar />
      <Routes>
        <Route path="/" element={
          <>
            <NewSpellForm editMode={editMode} spellToEdit={spellToEdit} onUpdate={updateFormData} onSubmit={submit} onCancelEdit={cancelEdit} onSearch={searchSpell} onResetFilter={resetFilters}/>
            <SpellList spells={currentSpells} loading={loading} message={message} onViewSpell={viewSpell} onCopySpell={copySpell} onEditSpell={editSpell} onDeleteSpell={deleteSpell} />
          </>}
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/spells"
          element={<Spells />}
        />
        <Route
          path="/about"
          element={<About />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
}

export default SpellCollections;
