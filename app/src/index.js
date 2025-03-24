import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SpellCollections from './App';
import reportWebVitals from './reportWebVitals';

const data = [{
  name: "Common Spell Book",
  spells: [
      { id: 0, name: "Mana Orb", description: 'Fire an orb of dense Mana,', spell_school: 'Destruction', action_type: "Main Action", effect_magnitude: 10, effect_area: 0, effect_range: 10, effect_count: 1, effect_duration: 0, spell_cost: 10, spell_resource: 'Mana', source_name: 'Public', source_link: 'None' },
      { id: 1, name: "Mana Arrow", description: 'Fire a sharp arrow of Mana,', spell_school: 'Destruction', action_type: "Main Action", effect_magnitude: 20, effect_area: 0, effect_range: 20, effect_count: 1, effect_duration: 0, spell_cost: 15, spell_resource: 'Mana', source_name: 'Public', source_link: 'None' },
      { id: 2, name: "Mage Hand", description: 'A magical construct in the shape of a hand.', spell_school: 'Conjuration', action_type: "Main Action", effect_magnitude: 5, effect_area: 0, effect_range: 20, effect_count: 1, effect_duration: 0, spell_cost: 20, spell_resource: 'Mana', source_name: 'Public', source_link: 'None' },
      { id: 3, name: "Mana Draw", description: 'The caster draws in ambient Mana to replenish their reserves.', spell_school: 'Restoration', action_type: "Main Action", effect_magnitude: 50, effect_area: 10, effect_range: 0, effect_count: 1, effect_duration: 0, spell_cost: 10, spell_resource: 'Mana', source_name: 'Public', source_link: 'None' },
      { id: 4, name: "Candlelight", description: 'Create a floating orb to illuminate the darkness.', spell_school: 'Conjuration', action_type: "Main Action", effect_magnitude: 20, effect_area: 10, effect_range: 0, effect_count: 1, effect_duration: 0, spell_cost: 20, spell_resource: 'Mana', source_name: 'Public', source_link: 'None' },
      { id: 5, name: "Oakflesh", description: "Turns one's flesh to be as durable as oak. ", spell_school: 'Alteration', action_type: "Main Action", effect_magnitude: 30, effect_area: 0, effect_range: 0, effect_count: 1, effect_duration: 0, spell_cost: 50, spell_resource: 'Mana', source_name: 'Public', source_link: 'None' }
  ],
  spellbook_descriptions: [
      "A common collection of spells.",
      "Oftentimes used as a way of measuring an student's learning.",
      "Simplistic and cheap.",
  ]
},
{
  name: "Legendary Spell Book",
  spells: [
    { id: 0, name: "Mana Vortex", description: 'Create a ripping vortex of Mana to shred apart armies.', spell_school: 'Destruction', action_type: "Main Action", effect_magnitude: 10000, effect_area: 1000, effect_range: 10000, effect_count: 10, effect_duration: 0, spell_cost: 5000, spell_resource: 'Mana', source_name: 'Public', source_link: 'None' },
    { id: 1, name: "Resurrect", description: 'Returns life to the dead, if only for a time', spell_school: 'Restoration', action_type: "Main Action", effect_magnitude: 1000, effect_area: 0, effect_range: 5, effect_count: 1, effect_duration: 0, spell_cost: 10000, spell_resource: 'Mana', source_name: 'Public', source_link: 'None' },
    { id: 2, name: "Great Shift", description: 'The pinnacle of teleportation magic, capable of transporting armies across entire nations', spell_school: 'Alteration', action_type: "Main Action", effect_magnitude: 100000, effect_duration: 0, effect_area: 10000, effect_range: 1000000, effect_count: 1, spell_cost: 8000, spell_resource: 'Mana', source_name: 'Public', source_link: 'None' },
    { id: 3, name: "Word of Death", description: 'A blasphemous spell stolen from the God of Death itself', spell_school: 'Necromancy', action_type: "Reaction", effect_magnitude: 500, effect_area: 0, effect_range: 10, effect_count: 1, effect_duration: 0, spell_cost: 50, spell_resource: 'Mana', source_name: 'Public', source_link: 'None' }
  ],
  spellbook_descriptions: [
      "A legendary collection of spells.",
      "Even the best Wizards may only know 1 or 2 of these spells.",
      "Awe-inspiring but very costly."
  ]
}
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SpellCollections spellbooks={data} title='All Spell Books'/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
