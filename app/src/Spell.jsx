// Name: Phuc Le

import { useLocation } from 'react-router-dom'

function get_dice(value) {
  var dice_types = [2, 3, 4, 6, 8, 10, 12, 20, 100]
  var best_dice = dice_types[0]
  var dice_count = 0
  var leftover = value
  for (let i = 0; i < dice_types.length; i++) {
    if (((1 + dice_types[i])/2 * 3) <= leftover) {
      best_dice = dice_types[i]
      dice_count = 3
    }
  }
  leftover = leftover - (((1+best_dice)/2) * dice_count)
  while ((1+best_dice)/2 <= leftover) {
    leftover = leftover - (1+best_dice)/2
    dice_count += 1
  }
  return [dice_count, best_dice, leftover]
}

export default function Spell({ id, name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable, errors, onViewClicked = f => f, onEditClicked = f => f, onCopyClicked = f => f, onDeleteClicked = f => f}) {
    let spell = {
      id: id,
      name: name,
      description: description,
      spell_school: spell_school,
      action_type: action_type,
      effect_magnitude: effect_magnitude,
      effect_area: effect_area,
      effect_range: effect_range,
      effect_count: effect_count,
      effect_duration: effect_duration,
      spell_cost: spell_cost,
      spell_resource: spell_resource,
      source_name: source_name,
      source_link: source_link,
      public_status: public_status,
      modifiable: modifiable,
      errors: errors
    }
    let public_status_str = 'True'
    if (spell.public_status === 0) {
      public_status_str = 'False'
    }
    let modifiable_str = 'True'
    if (spell.modifiable === 0) {
      modifiable_str = 'False'
    }
    let dice = {
      magnitude_dice: get_dice(effect_magnitude),
      count_dice: get_dice(effect_count),
      duration_dice: get_dice(effect_duration)
    }

    let location = useLocation()
    function view_back() {
      if (location.pathname !== `/spells/${id}`) {
        return <a href={`/spells/${spell.id}`} className='button'>View</a>
      } else {
        return <a href={`/spells`} className='button'>Back</a>
      }
    }
    return (
      <section>
        <h1>{spell.name}</h1>
        <div>
            <div className='spelldetails'> 
              <p className='spellname'>Spell Name: {spell.name}</p>
              <p>Spell ID: {spell.id}</p>
              <p>Spell School: {spell.spell_school}</p>
              <p>Action Cost: {spell.action_type}</p>
              <p>Effect Magnitude: {spell.effect_magnitude} <span>Dice: {dice.magnitude_dice[0]}d{dice.magnitude_dice[1]}+{dice.magnitude_dice[2]}</span></p>
              <p>Effect Area: {spell.effect_area}</p>
              <p>Effect Range: {spell.effect_range}</p>
              <p>Effect Count: {spell.effect_count}<span>Dice: {dice.count_dice[0]}d{dice.count_dice[1]}+{dice.count_dice[2]}</span></p>
              <p>Effect Duration: {spell.effect_duration}<span>Dice: {dice.duration_dice[0]}d{dice.duration_dice[1]}+{dice.duration_dice[2]}</span></p>
              <p>Casting Cost: {spell.spell_cost}</p>
              <p>Casting Resource: {spell.spell_resource}</p>
              <p>Source: {spell.source_name}</p>
              <p>Source Link: {spell.source_link}</p>
              <p>Publicly Viewable: {public_status_str}</p>
              <p>Quick Copyable: {modifiable_str}</p>
              <p>{spell.errors}</p>
              <p className='spelldesc'>Spell Description: {spell.description}</p>
              {view_back()}
              <button onClick={() => onCopyClicked(spell)}>Quick Copy</button>
              <button onClick={() => onEditClicked(spell)}>Edit</button>
              <button onClick={() => onDeleteClicked(spell)}>Delete</button>
            </div>
        </div>
      </section>
    ); 
  }