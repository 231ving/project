import React from 'react'
import { useParams } from 'react-router-dom'
import Spell from './Spell'

export default function SpellDetails({ spells, spellsList = f => f, loading = false, message, onViewSpell = f => f, onCopySpell = f => f, onEditSpell = f => f, onDeleteSpell = f => f, update = f => f  }) {

  let params = useParams()
  let id = params.id
  let spell = spells.find((item) => item.id === Number(id))

  const body = spell ?  <Spell {...spell} onViewClicked={() => onViewSpell(spell)} onCopyClicked={() => onCopySpell(spell)} onEditClicked={() => onEditSpell(spell)} onDeleteClicked={() => onDeleteSpell(spell)} /> : <span>Spell {id} not found.</span>
  
  return (
    <div>
      <h1>Spell Details</h1>
      {body}
    </div>

  )
}