import logo from './logo.svg';
import './App.css';

// Not using right now but eventually want to validate spells before displaying
import SpellModel from './Spell'

function Spell(props) {
  return <div className='spelldetails'>
    <p className='spellname'> {props.name} </p>
    <p> Spell School: {props.spell_school} </p>
    <p> Action Cost: {props.action_type} </p>
    <p> Effect Magnitude: {props.effect_magnitude} </p>
    <p> Effect Area: {props.effect_area} </p>
    <p> Effect Range: {props.effect_range} </p>
    <p> Effect Count: {props.effect_count} </p>
    <p> Casting Cost: {props.spell_cost} </p>
    <p> Casting Resource: {props.spell_resource} </p>
    <p> Spell Description: {props.description} </p>
    <p> Source: {props.source_name} </p>
    <p> Source Link: {props.source_link} </p>
  </div>
}

function SpellList(props) {
  return <div className="spells" >
  {
      props.spells.map((item, index) => (
          <Spell name={item.name} description={item.description} spell_school={item.spell_school} action_type={item.action_type} effect_magnitude={item.effect_magnitude} effect_area={item.effect_area} effect_range={item.effect_range} effect_count={item.effect_count} spell_cost={item.spell_cost} spell_resource={item.spell_resource} source_name={item.source_link} key={index} />
      ))}
  
  </div>
}

function SpellbookDescription(props) {
  return <div className='spellbook_description'>
      <h3>Spellbook Information</h3>
      {props.spellbook_descriptions.map((spellbook_description, index) => (<p key={index}>{spellbook_description}</p>))}
  </div>;
}

function Spellbook(props) {
  return <div>
      <h2 onClick={() => console.log(`You clicked on the ${props.name}`)}> {props.name} </h2>
      <SpellList spells={props.spells} />
      <SpellbookDescription spellbook_descriptions={props.spellbook_descriptions} />
  </div>;
}

function SpellCollections(props) {
  return <section>
      <h1> {props.title} </h1>
      <div className='spells' > {props.spellbooks.map((spellbook, index) => (
          <Spellbook key={index}
              name={spellbook.name}
              spells={spellbook.spells}
              spellbook_descriptions={spellbook.spellbook_descriptions}                
          />
      ))}
      </div>
  </section>;
}

export default SpellCollections;