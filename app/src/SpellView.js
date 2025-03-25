// Name: Phuc Le
import { useState } from 'react'

export function Spell(props, updateSpells = f => f, deleteSpell = f => f) {
  const [SpellData, setSpellData] = useState(
    {id: props.id, name: props.name, description: props.description,
      spell_school: props.spell_school, action_type: props.action_type,
      effect_magnitude: props.effect_magnitude, effect_area: props.effect_area,
      effect_range: props.effect_range, effect_count: props.effect_count,
      effect_duration: props.effect_duration, spell_cost: props.spell_cost,
      spell_resource: props.spell_resource, source_name: props.source_name,
      source_link: props.source_link
    }
  )
  const handleChange = (e) => {
    const {name, value} = e.target;
    setSpellData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    //console.log(name, value, e)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateSpells(props.currentSpellbookIndex, props.currentSpellbookContentIndex, SpellData)
  }
  function viewSpell() {
    return
  }
  function quickEdit() {
    return
  }
  return <form onSubmit={handleSubmit}>
  <div className='spelldetails'>
    <p className='spellname'>Spell Name: {props.name} <input type='text' name='name' value={SpellData.name} onChange={handleChange}></input></p>
    <p>Spell School: {props.spell_school} <input type='text' name='spell_school' value={SpellData.spell_school} onChange={handleChange}></input></p>
    <p>Action Cost: {props.action_type} <input type='text' name='action_type' value={SpellData.action_type} onChange={handleChange}></input></p>
    <p>Effect Magnitude: {props.effect_magnitude} <input type='text' name='effect_magnitude' value={SpellData.effect_magnitude} onChange={handleChange}></input></p>
    <p>Effect Area: {props.effect_area} <input type='text' name='effect_area' value={SpellData.effect_area} onChange={handleChange}></input></p>
    <p>Effect Range: {props.effect_range} <input type='text' name='effect_range' value={SpellData.effect_range} onChange={handleChange}></input></p>
    <p>Effect Count: {props.effect_count} <input type='text' name='effect_count' value={SpellData.effect_count} onChange={handleChange}></input></p>
    <p>Effect Duration: {props.effect_duration} <input type='text' name='effect_duration' value={SpellData.effect_duration} onChange={handleChange}></input></p>
    <p>Casting Cost: {props.spell_cost} <input type='text' name='spell_cost' value={SpellData.spell_cost} onChange={handleChange}></input></p>
    <p>Casting Resource: {props.spell_resource} <input type='text' name='spell_resource' value={SpellData.spell_resource} onChange={handleChange}></input></p>
    <p>Source: {props.source_name} <input type='text' name='source_name' value={SpellData.source_name} onChange={handleChange}></input></p>
    <p>Source Link: {props.source_link} <input type='text' name='source_link' value={SpellData.source_link} onChange={handleChange}></input></p>
    <p className='spelldesc'>Spell Description: {props.description}</p>
    <input type='text' className='spelldescription' name='description' value={SpellData.description} onChange={handleChange}></input>
    <button onClick={() => viewSpell()}>Placeholder for View</button>
    <button type='submit'>Save Edited Spell</button>
    <button type='button' onClick={() => props.deleteSpell(props.currentSpellbookIndex, props.currentSpellbookContentIndex)}>Delete</button>
    <button onClick={() => quickEdit()}>Placeholder for QuickEdit</button>
  </div>
  </form>
};