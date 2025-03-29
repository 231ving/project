import { useState } from 'react'
import { SpellList } from './SpellListView.js'
import { SpellbookDescription } from'./DescriptionList.js'

// Not using right now but eventually want to validate spells before displaying
// import SpellModel from './Spell'

// Currently CRUD is using static inputs
// Having trouble dynamically adding input boxes and re-rendering upon change

export function Spellbook(props, updateSpellbookName = f => f, deleteBook = f => f) {
  const [DescriptionData, setDescriptionData] = useState('')
  const handleChange = (e) => {
    const {value} = e.target;
    setDescriptionData((prevData) => (
      value))
    //console.log(name, value, e)
  }
  const handleSubmit = (e) => {
    console.log(DescriptionData)
    e.preventDefault();
    props.updateSpellbookName(props.currentSpellbookIndex, DescriptionData)
  }
  return <div>
      <h2 onClick={() => console.log(`You clicked on the ${props.name}`)}> {props.name} </h2>
      <form onSubmit={handleSubmit}>
      <div>
      <p className='input'>Updated Spellbook Name: <input type='text' name='name' value={DescriptionData} onChange={handleChange}></input></p>
      <button type='submit' className='save'>Save Updated Name</button>
      </div>
      </form>
      <button type='button' onClick={() => props.deleteBook(props.currentSpellbookIndex)}>Delete Spellbook</button>
      
      <SpellList spells={props.spells}
       currentSpellbookIndex={props.currentSpellbookIndex}
       currentSpellbookContentIndex={props.currentSpellbookContentIndex}
       updateSpells={props.updateSpells}
       newSpells={props.newSpells}
       deleteSpell={props.deleteSpell}
       name={props.name}/>

      <SpellbookDescription spellbook_descriptions={props.spellbook_descriptions}
       currentSpellbookIndex={props.currentSpellbookIndex}
       currentSpellbookContentIndex={props.currentSpellbookContentIndex} 
       updateDescriptions={props.updateDescriptions}
       newDescriptions={props.newDescriptions}
       deleteDesc={props.deleteDesc}/>
  </div>;
};