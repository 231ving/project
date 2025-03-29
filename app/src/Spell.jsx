// Name: Phuc Le

export default function Spell({ id, name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable, errors, onEditClicked = f => f, onDeleteClicked = f => f}) {
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
    
    return (
      <section>
        <h1>{spell.name}</h1>
        <div>
            <div className='spelldetails'> 
              <p className='spellname'>Spell Name: {spell.name}</p>
              <p>Spell ID: {spell.id}</p>
              <p>Spell School: {spell.spell_school}</p>
              <p>Action Cost: {spell.action_type}</p>
              <p>Effect Magnitude: {spell.effect_magnitude}</p>
              <p>Effect Area: {spell.effect_area}</p>
              <p>Effect Range: {spell.effect_range}</p>
              <p>Effect Count: {spell.effect_count}</p>
              <p>Effect Duration: {spell.effect_duration}</p>
              <p>Casting Cost: {spell.spell_cost}</p>
              <p>Casting Resource: {spell.spell_resource}</p>
              <p>Source: {spell.source_name}</p>
              <p>Source Link: {spell.source_link}</p>
              <p>Publicly Viewable: {spell.public_status}</p>
              <p>Quick Modifiable: {spell.modifiable}</p>
              <p>{spell.errors}</p>
              <p className='spelldesc'>Spell Description: {spell.description}</p>
            <button onClick={() => onEditClicked(spell)}>Edit</button>
            <button onClick={() => onDeleteClicked(spell)}>Delete</button>
            </div>
        </div>
      </section>
    );
  }