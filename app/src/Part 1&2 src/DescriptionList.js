// Name: Phuc Le
import { useState } from 'react'
import { Description } from './Description.js'

export function SpellbookDescription(props, newDescriptions = f => f) {
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
    props.newDescriptions(props.currentSpellbookIndex, DescriptionData)
  }
  return <div className='spellbook_description'>
      <h3>Spellbook Information</h3>
      {props.spellbook_descriptions.map((spellbook_description, index) => (
        <Description key={index} spellbook_description={spellbook_description}
         currentSpellbookIndex={props.currentSpellbookIndex}
          currentSpellbookContentIndex={index}
          updateDescriptions={props.updateDescriptions}
          deleteDesc={props.deleteDesc}/>))}
    <form onSubmit={handleSubmit}>
    <div className='spellbook_description'>
    <p className='spellbook_description'>New Description: 
      <input type='text' name='description' value={DescriptionData} onChange={handleChange}></input>
      <button type='submit' className='center_button'>Save New Description</button>
    </p>
    </div>
    </form>
  </div>;
};