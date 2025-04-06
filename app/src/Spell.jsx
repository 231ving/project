// Name: Phuc Le

import { useLocation, useNavigate } from 'react-router-dom'


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

export default function Spell({ id, name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable, errors, currhistory, onSetHistoryClicked = f => f, onEditClicked = f => f, onCopyClicked = f => f, onDeleteClicked = f => f}) {
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
    const navigate = useNavigate()

    function onView(spell) {
      onSetHistoryClicked(spell)
      navigate(`/spells/${spell.id}`)
    }

    let location = useLocation()
    function view_back() {
      if (location.pathname !== `/spells/${id}`) {
        return <button className='col-s-3 col-6'onClick={() => onView(spell)}>View</button>
      } else {
        return <button className='col-s-3 col-6'onClick={() => navigate(`/spells`)}>Back</button>
      }
    }

    function error_log()  {
      if (errors.length !== 0) {
          return <div>Error List:
              <ul>
                  {errors.map((item, key) => (
                  <li>{item}</li>
                  ))}
              </ul>
          </div>
      }
  }

    return (
      <section className='single_spell'>
        <h1>{spell.name}</h1>
        <div className='container'>
            <div className='row spell'>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Spell Name: {spell.name}</p>
              <div className='col-lg-2 col-sm-3 col-s-4 col-3'>Spell ID: {spell.id}</div>
              <div className='col-lg-2 col-sm-3 col-s-4 col-3'>Spell School: {spell.spell_school}</div>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Action Cost: {spell.action_type}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Effect Magnitude: {spell.effect_magnitude} <span>Dice: {dice.magnitude_dice[0]}d{dice.magnitude_dice[1]}+{dice.magnitude_dice[2]}</span></p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Effect Area: {spell.effect_area}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Effect Range: {spell.effect_range}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Effect Count: {spell.effect_count}<span>Dice: {dice.count_dice[0]}d{dice.count_dice[1]}+{dice.count_dice[2]}</span></p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Effect Duration: {spell.effect_duration}<span>Dice: {dice.duration_dice[0]}d{dice.duration_dice[1]}+{dice.duration_dice[2]}</span></p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Casting Cost: {spell.spell_cost}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Casting Resource: {spell.spell_resource}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Source: {spell.source_name}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Source Link: {spell.source_link}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Publicly Viewable: {public_status_str}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Quick Copyable: {modifiable_str}</p>
              {error_log()}
              <p className='col-12 spell_desc'>Spell Description: {spell.description}</p>
              {view_back()}
              <button className='col-s-3 col-6' onClick={() => onCopyClicked(spell)}>Quick Copy</button>
              <button className='col-s-3 col-6'onClick={() => onEditClicked(spell)}>Edit</button>
              <button className='col-s-3 col-6' onClick={() => onDeleteClicked(spell)}>Delete</button>
            </div>
        </div>
      </section>
    ); 
  }