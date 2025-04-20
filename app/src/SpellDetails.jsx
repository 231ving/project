import React from 'react'
import { useParams } from 'react-router-dom'
import Spell from './Spell'

export default function SpellDetails({ spells, currUser, loading = false, message, onSetSpellHistoryClicked = f => f, onCopySpell = f => f, onEditSpell = f => f, onDeleteSpell = f => f, update = f => f  }) {

  let params = useParams()
  let id = params.id
  let spell = spells.find((item) => item.id === Number(id))

  const body = spell ?  <Spell {...spell} currUser={currUser} onSetSpellHistoryClicked={() => onSetSpellHistoryClicked(spell)} onCopyClicked={() => onCopySpell(spell)} onEditClicked={() => onEditSpell(spell)} onDeleteClicked={() => onDeleteSpell(spell)} /> : <span>Spell {id} not found.</span>
  
  return (
    <div>
      <h1>Spell Details</h1>
      {body}
    </div>

  )
}