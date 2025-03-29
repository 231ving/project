import { useState, useEffect } from 'react'
import './App.css'
import {Spellbook} from './Spellbook.js'

// Currently CRUD is using static inputs
// Having trouble dynamically adding input boxes and re-rendering upon change

function SpellCollections(props) {
  const [currentSpells, setSpellCollection] = useState(props.spellbooks);
  const [currentSpellbookIndex, setSpellbookIndex] = useState(0);
  const [currentSpellbookContentIndex, setSpellbookContentIndex] = useState(0);
  const [SpellbookName, setSpellbookName] = useState('')
  
  const handleChange = (e) => {
    const {value} = e.target;
    setSpellbookName((prevData) => (
      value))
    //console.log(name, value, e)
  }
  
  const newBook = (newContent) => {
    const temp = currentSpellCollection
    temp.push({name: newContent, spells: [], spellbook_descriptions: []})
    setSpellCollection(temp)
    console.log(currentSpellCollection)
  }

  const handleSubmit = (e) => {
    console.log(SpellbookName)
    e.preventDefault();
    newBook(SpellbookName)
  }

  const newDescriptions = (spellbookIndex, newContent) => {
    const temp = currentSpellCollection
    temp[spellbookIndex].spellbook_descriptions.push(newContent)
    setSpellCollection(temp)
    console.log(currentSpellCollection[spellbookIndex].spellbook_descriptions)
  }

  const newSpells = (spellbookIndex, newContent) => {
    const temp = currentSpellCollection
    temp[spellbookIndex].spells.push(newContent)
    setSpellCollection(temp)
    console.log(currentSpellCollection[spellbookIndex].spells)
  }

  const updateSpellbookName = (spellbookIndex, newContent) => {
    const temp = currentSpellCollection
    temp[spellbookIndex].name = newContent
    setSpellCollection(temp)
    console.log(currentSpellCollection[spellbookIndex])
  }

  const updateDescriptions = (spellbookIndex, contentIndex, newContent) => {
    const temp = currentSpellCollection
    temp[spellbookIndex].spellbook_descriptions[contentIndex] = newContent
    setSpellCollection(temp)
    console.log(currentSpellCollection[spellbookIndex].spellbook_descriptions)
  }

  const updateSpells = (spellbookIndex, contentIndex, newContent) => {
    const temp = currentSpellCollection
    temp[spellbookIndex].spells[contentIndex] = newContent
    setSpellCollection(temp)
    console.log(currentSpellCollection[spellbookIndex].spells)
  }

  const deleteBook = (spellbookIndex) => {
    const temp = currentSpellCollection
    delete temp[spellbookIndex]
    setSpellCollection(temp)
    console.log(currentSpellCollection)
  }
  const deleteDesc = (spellbookIndex, contentIndex) => {
    const temp = currentSpellCollection
    delete temp[spellbookIndex].spellbook_descriptions[contentIndex]
    setSpellCollection(temp)
    console.log(currentSpellCollection[spellbookIndex].spellbook_descriptions)
  }

  const deleteSpell = (spellbookIndex, contentIndex) => {
    const temp = currentSpellCollection
    delete temp[spellbookIndex].spells[contentIndex]
    setSpellCollection(temp)
    console.log(currentSpellCollection[spellbookIndex].spells)
  }

  return <section>
      <h1> {props.title} </h1>
      <div className='spells' > {currentSpellCollection.map((spellbook, index) => (
          <Spellbook key={index}
              name={spellbook.name} spells={spellbook.spells}
              spellbook_descriptions={spellbook.spellbook_descriptions}
              currentSpellbookIndex={index} currentSpellbookContentIndex={0}
              newDescriptions={newDescriptions} newSpells={newSpells}
              updateSpellbookName={updateSpellbookName} updateDescriptions={updateDescriptions}
              updateSpells={updateSpells} deleteBook={deleteBook}
              deleteDesc={deleteDesc} deleteSpell={deleteSpell}
          />
      ))}
      <form onSubmit={handleSubmit}>
        <div className='spellbook_description'>
          <p className='spellbook_description left'>New Spellbook: <input type='text' name='description' value={SpellbookName} onChange={handleChange}></input></p>
          <button type='submit' className='center_button'>Create New Spellbook</button>
        </div>
      </form>
    </div>
  </section>;
}

export default SpellCollections;
