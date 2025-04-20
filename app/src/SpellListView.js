// Name: Phuc Le

import React from "react";
import Spell from "./Spell";

export default function SpellList({ spells = [], currUser, loading = false, message, onSetSpellHistoryClicked = f => f, onCopySpell = f => f, onEditSpell = f => f, onDeleteSpell = f => f, update = f => f }) {
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
        spells.filter(item => item.public_status === 1 || item.source_name === currUser.username || currUser.admin === 1).map(spell => <Spell key={spell.id} {...spell} currUser={currUser} onSetSpellHistoryClicked={() => onSetSpellHistoryClicked(spell)} onCopyClicked={() => onCopySpell(spell)} onEditClicked={() => onEditSpell(spell)} onDeleteClicked={() => onDeleteSpell(spell)} />)
      }
    </div>
  );
}