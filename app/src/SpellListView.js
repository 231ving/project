// Name: Phuc Le

import React from "react";
import Spell from "./Spell";

export default function SpellList({ spells = [], loading = false, message, onViewSpell = f => f, onCopySpell = f => f, onEditSpell = f => f, onDeleteSpell = f => f, update = f => f }) {
  if (message) {
    return <div>{message}</div>
  } else if (loading) {
    return <div>Loading ......</div>;
  } else if(!spells.length) {
    return <div>No Spells Listed.</div>;
  } 
  return (
    <div>
      {
        spells.map(spell => <Spell key={spell.id} {...spell} onViewClicked={() => onViewSpell(spell)} onCopyClicked={() => onCopySpell(spell)} onEditClicked={() => onEditSpell(spell)} onDeleteClicked={() => onDeleteSpell(spell)} />)
      }
    </div>
  );
}