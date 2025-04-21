// Name: Phuc Le
import CollectionAPI from './CollectionAPI.js'
import {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SpellSimple from './SpellSimple.jsx'

export default function CollectionConnectionForm({ spells, collections, currUser, collectionToEdit, onUpdateCollection = f => f, onSubmit = f => f, onDelete = f => f}) {
    const [spellsInCollection, setSpells] = useState(spells)
    const [spellsNotInCollection, setOtherSpells] = useState(spells)
    const navigate = useNavigate()

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
    let fetchSpellsNotInCollection = () => {
        CollectionAPI.fetchSpellsNotInCollection(collection).then(data => {
            setOtherSpells(data)
        }).catch(problem => {
            console.log("Problem when calling CollectionAPI.fetchSpellsNotInCollection()")
        })
    }
    
    let setCurrCollection = () => {
        onUpdateCollection(collection)
    }

    let Delete = (spell) => {
        onDelete({spell: spell, collection: collection})
        fetchSpellsInCollection()
        fetchSpellsNotInCollection()
    }

    let Submit = (spell) => {
        onSubmit({spell: spell, collection: collection})
        fetchSpellsInCollection()
        fetchSpellsNotInCollection()
    }

    useEffect(fetchSpellsInCollection, [collection])
    useEffect(fetchSpellsNotInCollection, [collection])
    useEffect(setCurrCollection, [collection])

    function remove_spell_list() {
        if (spellsInCollection) {
            return <div>
                {spellsInCollection.filter(item => item.public_status === 1 || item.source_name === currUser.username || currUser.admin === 1).map((data, key) => <SpellSimple key={key} {...data} add={false} onSubmit={Submit} onDeleteConnection={Delete} /> )}
                </div>
        } else {
            return <section>No Spells In Collection</section>
        }
    }

    function add_spell_list() {
        if (spellsInCollection) {
            return <div>
                {spellsNotInCollection.filter(item => item.public_status === 1 || item.source_name === currUser.username || currUser.admin === 1).map((data, key) => <SpellSimple key={key} {...data} add={true} onSubmit={Submit} onDeleteConnection={Delete} /> )}
                </div>
        } else {
            return <section>No Spells Available</section>
        }
    }

    // See the "Creating Custom Hooks" section in Porcello and Banks
    // for a short-cut to the cut-and-paste for value and onChange.
    return (<section>
        <div className='container updateForm connection'>
            <button onClick={() => navigate(`/collections/${id}`)}>Back</button>
            <h1 className='spell connection'>Spells In Collection</h1>
            <div>{remove_spell_list()}</div>
        </div>
        <div className='container updateForm connection'>
            <h1 className='spell connection'>Spells Not In Collection</h1>
            <div>{add_spell_list()}</div>
            <button onClick={() => navigate(`/collections/${id}`)}>Back</button>
        </div>
        </section>
    )
}