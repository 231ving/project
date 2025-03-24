import { useState } from 'react'
import './App.css';

// Not using right now but eventually want to validate spells before displaying
// import SpellModel from './Spell'

// Currently CRUD is using static inputs
// Having trouble dynamically adding input boxes and re-rendering upon change

function Spell(props, updateSpells = f => f, deleteSpell = f => f) {
  function viewSpell() {
    console.log('View Spell', props.currentSpellbookIndex)
    return
  }
  return <div className='spelldetails'>
    <p className='spellname'>Spell Name: {props.name}</p>
    <p>Spell School: {props.spell_school}</p>
    <p>Action Cost: {props.action_type}</p>
    <p>Effect Magnitude: {props.effect_magnitude}</p>
    <p>Effect Area: {props.effect_area}</p>
    <p>Effect Range: {props.effect_range}</p>
    <p>Effect Count: {props.effect_count}</p>
    <p>Effect Duration: {props.effect_duration}</p>
    <p>Casting Cost: {props.spell_cost}</p>
    <p>Casting Resource: {props.spell_resource}</p>
    <p>Source: {props.source_name}</p>
    <p>Source Link: {props.source_link}</p>
    <p className='spelldesc'>Spell Description: {props.description}</p>
    <button onClick={() => viewSpell()}>Placeholder for View</button>
    <button onClick={() => props.updateSpells(props.currentSpellbookIndex, props.currentSpellbookContentIndex,
       { id: 0, name: "N/A", description: 'N/A', spell_school: 'N/A', action_type: "N/A",
        effect_magnitude: 1, effect_area: 0, effect_range: 0, effect_count: 1, effect_duration: 0,
         spell_cost:1, spell_resource: 'Mana', source_name: 'N/A', source_link: 'None'})}>Edit</button>
    <button onClick={() => props.deleteSpell(props.currentSpellbookIndex, props.currentSpellbookContentIndex)}>Delete</button>
  </div>
}

function SpellList(props, newSpell = f => f) {
  return <div className="spells" >
  {
      props.spells.map((item, index) => (
          <Spell id={item.id} name={item.name}
           description={item.description} spell_school={item.spell_school}
            action_type={item.action_type} effect_magnitude={item.effect_magnitude}
             effect_area={item.effect_area} effect_range={item.effect_range}
              effect_count={item.effect_count} effect_duration={item.effect_duration}
               spell_cost={item.spell_cost} spell_resource={item.spell_resource}
                source_name={item.source_link} currentSpellbookIndex={props.currentSpellbookIndex}
                 currentSpellbookContentIndex={index} key={index}
                 updateSpells={props.updateSpells}
                 deleteSpell={props.deleteSpell}/>
      ))}
    <button onClick={() => props.newSpell(props.currentSpellbookContentIndex, 
      {id: 0, name: "N/A", description: 'N/A', spell_school: 'N/A',
       action_type: "N/A", effect_magnitude: 1, effect_area: 0,
        effect_range: 0, effect_count: 1, effect_duration: 0, spell_cost:1,
         spell_resource: 'Mana', source_name: 'N/A', source_link: 'None'})}>New Spell</button>
  </div>
}

function Description(props, updateDescriptions = f => f, deleteDesc = f => f) {
  return <p className='spellbook_description'>
    {props.spellbook_description}
    <button className='desc_button' onClick={() => props.deleteDesc(props.currentSpellbookIndex, props.currentSpellbookContentIndex)}>Delete</button>
    <button className='desc_button' onClick={() => props.updateDescriptions(props.currentSpellbookIndex, props.currentSpellbookContentIndex, 'Placeholder New Desc')}>Edit</button>
  </p>
}

function SpellbookDescription(props, newDescriptions = f => f) {
  return <div className='spellbook_description'>
      <h3>Spellbook Information</h3>
      {props.spellbook_descriptions.map((spellbook_description, index) => (
        <Description key={index} spellbook_description={spellbook_description}
         currentSpellbookIndex={props.currentSpellbookIndex}
          currentSpellbookContentIndex={index}
          updateDescriptions={props.updateDescriptions}
          deleteDesc={props.deleteDesc}/>))}
      
      <button className='center_button' onClick={() => props.newDescriptions(props.currentSpellbookIndex, 'Quick')}>New Description</button>
  </div>;
}

function Spellbook(props, updateSpellbookName = f => f, deleteBook = f => f) {
  return <div>
      <h2 onClick={() => console.log(`You clicked on the ${props.name}`)}> {props.name} </h2>
      <button onClick={() => props.updateSpellbookName(props.currentSpellbookIndex, 'Null')}>Edit Spellbook Name</button>
      <button onClick={() => props.deleteBook(props.currentSpellbookIndex)}>Delete Spellbook</button>
      
      <SpellList spells={props.spells}
       currentSpellbookIndex={props.currentSpellbookIndex}
       currentSpellbookContentIndex={props.currentSpellbookContentIndex}
       updateSpells={props.updateSpells}
       newSpells={props.newSpells}
       deleteSpell={props.deleteSpell}/>

      <SpellbookDescription spellbook_descriptions={props.spellbook_descriptions}
       currentSpellbookIndex={props.currentSpellbookIndex}
       currentSpellbookContentIndex={props.currentSpellbookContentIndex} 
       updateDescriptions={props.updateDescriptions}
       newDescriptions={props.newDescriptions}
       deleteDesc={props.deleteDesc}/>
  </div>;
}

function SpellCollections(props) {
  const [currentSpellCollection, setSpellCollection] = useState(props.spellbooks);
  const [currentSpellbookIndex, setSpellbookIndex] = useState(0);
  const [currentSpellbookContentIndex, setSpellbookContentIndex] = useState(0);
  
  const newBook = (newContent) => {
    const temp = currentSpellCollection
    temp.push({name: newContent, spells: [], spellbook_descriptions: []})
    setSpellCollection(temp)
    console.log(currentSpellCollection)
  }

  const newDescriptions = (spellbookIndex, newContent) => {
    const temp = currentSpellCollection
    temp[spellbookIndex].spellbook_descriptions.push(newContent)
    setSpellCollection(temp)
    console.log(currentSpellCollection[spellbookIndex].spellbook_descriptions)
  }

  const newSpells = (spellbookIndex, newContent) => {
    const temp = currentSpellCollection
    temp[spellbookIndex].spells.push({newContent})
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
              name={spellbook.name}
              spells={spellbook.spells}
              spellbook_descriptions={spellbook.spellbook_descriptions}
              currentSpellbookIndex={index}
              currentSpellbookContentIndex={0}
              newDescriptions={newDescriptions}
              newSpells={newSpells}
              updateSpellbookName={updateSpellbookName}
              updateDescriptions={updateDescriptions}
              updateSpells={updateSpells}
              deleteBook={deleteBook}
              deleteDesc={deleteDesc}
              deleteSpell={deleteSpell}
          />
      ))}
      <button onClick={() => newBook('Placeholder')}>New Spellbook</button>
      </div>
  </section>;
}

export default SpellCollections;