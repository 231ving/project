// Name: Phuc Le

import { useLocation, useNavigate } from 'react-router-dom'

export default function SpellSimple({ id, name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable, errors, add, onSubmit = f => f, onDeleteConnection = f => f}) {
    const navigate = useNavigate()
    let location = useLocation()
    let spell = {
      id: id, name: name, description: description, spell_school: spell_school,
      action_type: action_type, effect_magnitude: effect_magnitude,
      effect_area: effect_area, effect_range: effect_range,
      effect_count: effect_count, effect_duration: effect_duration,
      spell_cost: spell_cost, spell_resource: spell_resource,
      source_name: source_name, source_link: source_link,
      public_status: public_status, modifiable: modifiable, errors: errors
    }
    let public_status_str = 'True'
    if (spell.public_status === 0) {
      public_status_str = 'False'
    }
    let modifiable_str = 'True'
    if (spell.modifiable === 0) {
      modifiable_str = 'False'
    }

    function finishSubmit() {
      if (!add) {
        onDeleteConnection(spell)
      } else {
        onSubmit(spell)
      }
    }

    return (
      <section className='single_spell'>
        <h1>{spell.name}</h1>
        <div className='container'>
            <div className='row spell'>
              <div className='col-lg-2 col-sm-3 col-s-4 col-3'>Spell School: {spell.spell_school}</div>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Action Cost: {spell.action_type}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Effect Magnitude: {spell.effect_magnitude}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Effect Area: {spell.effect_area}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Effect Range: {spell.effect_range}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Effect Count: {spell.effect_count}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Effect Duration: {spell.effect_duration}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Casting Cost: {spell.spell_cost}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Casting Resource: {spell.spell_resource}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Source: {spell.source_name}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Source Link: {spell.source_link}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Publicly Viewable: {public_status_str}</p>
              <p className='col-lg-2 col-sm-3 col-s-4 col-3'>Quick Copyable: {modifiable_str}</p>
              <p className='col-12 spell_desc'>Spell Description: {spell.description}</p>
            </div>
        </div>
        <button onClick={() => finishSubmit()}>{add ? 'Add ' : 'Delete '}Connection</button>
      </section>
    );
  }