// Name: Phuc Le
import { useState } from 'react'
import { Spell } from './SpellView.js'

export function SpellList(props, newSpells = f => f) {
  const [SpellData, setSpellData] = useState(
    {id: 0, name: '', description: '',
      spell_school: '', action_type: '',
      effect_magnitude: '', effect_area: '',
      effect_range: '', effect_count: '',
      effect_duration: '', spell_cost: '',
      spell_resource: '', source_name: '',
      source_link: ''
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
    console.log(SpellData)
    e.preventDefault();
    props.newSpells(props.currentSpellbookIndex, SpellData)
  }
  return <div className="spells" >
  {props.spells.map((item, index) => (
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
    <h2>New Spell for {props.name}</h2>
    <form onSubmit={handleSubmit}>
    <div className='spelldetails'>
    <p className='spellname'>Spell Name: <input type='text' name='name' value={SpellData.name} onChange={handleChange}></input></p>
    <p>Spell School: <input type='text' name='spell_school' value={SpellData.spell_school} onChange={handleChange}></input></p>
    <p>Action Cost: <input type='text' name='action_type' value={SpellData.action_type} onChange={handleChange}></input></p>
    <p>Effect Magnitude: <input type='text' name='effect_magnitude' value={SpellData.effect_magnitude} onChange={handleChange}></input></p>
    <p>Effect Area: <input type='text' name='effect_area' value={SpellData.effect_area} onChange={handleChange}></input></p>
    <p>Effect Range: <input type='text' name='effect_range' value={SpellData.effect_range} onChange={handleChange}></input></p>
    <p>Effect Count: <input type='text' name='effect_count' value={SpellData.effect_count} onChange={handleChange}></input></p>
    <p>Effect Duration: <input type='text' name='effect_duration' value={SpellData.effect_duration} onChange={handleChange}></input></p>
    <p>Casting Cost: <input type='text' name='spell_cost' value={SpellData.spell_cost} onChange={handleChange}></input></p>
    <p>Casting Resource: <input type='text' name='spell_resource' value={SpellData.spell_resource} onChange={handleChange}></input></p>
    <p>Source: <input type='text' name='source_name' value={SpellData.source_name} onChange={handleChange}></input></p>
    <p>Source Link: <input type='text' name='source_link' value={SpellData.source_link} onChange={handleChange}></input></p>
    <p className='spelldesc'>Spell Description: {props.description} 
      <input type='text' name='description' value={SpellData.description} onChange={handleChange}></input>
      <button type='submit' className='submit_spell'>Save New Spell</button>  
    </p>

    </div>
    </form>
  </div>
};