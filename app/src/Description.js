// Name: Phuc Le
import { useState } from 'react'

export function Description(props, updateDescriptions = f => f, deleteDesc = f => f) {
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
      props.updateDescriptions(props.currentSpellbookIndex, props.currentSpellbookContentIndex, DescriptionData)
    }
    return <div className='spellbook_description'>
      {props.spellbook_description}
      <button type='button' className='desc_button' onClick={() => props.deleteDesc(props.currentSpellbookIndex, props.currentSpellbookContentIndex)}>Delete</button>
      <form onSubmit={handleSubmit}>
      <div className='spellbook_description'>
      <p className='spellbook_description left'>Edited Description: <input type='text' name='description' value={DescriptionData} onChange={handleChange}></input></p>
      <button type='submit' className='desc_button'>Save Updated Description</button>
      </div>
      </form>
    </div>
  };