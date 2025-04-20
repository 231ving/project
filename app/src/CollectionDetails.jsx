import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Collection from './Collection'
import CollectionAPI from './CollectionAPI.js'
import Spell from "./Spell";

export default function CollectionDetails({ collections, spells, currUser, loading = false, message, onSetCollectionHistoryClicked = f => f, onSetSpellHistoryClicked = f => f, onCopySpell = f => f, onEditSpell = f => f, onDeleteSpell = f => f, onCopyCollection = f => f, onEditCollection = f => f, onDeleteCollection = f => f, update = f => f }) {
  const [spellsInCollection, setSpells] = useState(spells)

  let params = useParams()
  let id = params.id
  let collection = collections.find((item) => item.id === Number(id))

  let fetchSpellsInCollection = () => {
    CollectionAPI.fetchSpellsInCollection(collection).then(data => {
      setSpells(data)
    }).catch(problem => {
      console.log("Problem when calling CollectionAPI.fetchSpellsInCollection()")
    })
  }

  function show_spells() {
    if (spellsInCollection.length !== spells.length) {
      return <section>
        <h1>Spells In Collection</h1>
        {spellsInCollection.map(spell => <Spell key={spell.id} {...spell} currUser={currUser} onSetSpellHistoryClicked={() => onSetSpellHistoryClicked(spell)} onCopyClicked={() => onCopySpell(spell)} onEditClicked={() => onEditSpell(spell)} onDeleteClicked={() => onDeleteSpell(spell)} />)}
      </section>
    } else {
      return <h1>No Spells In Collection</h1>
    }
  }

  const body = collection ?  <Collection {...collection} currUser={currUser} onSetCollectionHistoryClicked={() => onSetCollectionHistoryClicked(collection)} onCopyClicked={() => onCopyCollection(collection)} onEditClicked={() => onEditCollection(collection)} onDeleteClicked={() => onDeleteCollection(collection)} /> : <span>Collection {id} not found.</span>
  useEffect(fetchSpellsInCollection, [collection])

  return (
    <div>
      <h1>Collection Details</h1>
      {body}
      {show_spells()}
    </div>
  )
}