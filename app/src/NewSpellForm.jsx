// Name: Phuc Le
// Currently having issues with input boxes deselecting after every change in input
import { useLocation, useNavigate } from 'react-router-dom'

export default function AddSpellForm({ editMode, currUser, spellToEdit, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f, onCancelCopy = f => f}) {
    const navigate = useNavigate()
    let location = useLocation()
    if (!editMode && spellToEdit.source_name !== currUser.username) {
        onUpdate({...spellToEdit, source_name: currUser.username})
    }

    function error_log()  {
        if (spellToEdit.errors.length !== 0) {
            return <div>Error List:
                <ul>
                    {spellToEdit.errors.map((item, key) => (
                    <li>{item}</li>
                    ))}
                </ul>
            </div>
        }
    }

    function allow_cancels() {
        if (editMode) {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onCancelEdit(spellToEdit)}>Cancel Edit</button>
        } else if (spellToEdit.id !== 0 ) {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onCancelCopy(spellToEdit)}>Cancel Quick Copy</button>
        }
    }

    function back() {
        if (spellToEdit.id === 0) {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => navigate(`/spells`)}>Back</button>
        } else {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => navigate(`/spells/${spellToEdit.id}`)}>Back</button>
        }
    }

    function selected_public_status() {
        if (spellToEdit.public_status === Number(1)) {
            return <section className='row'>
                <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Viewable: </div>
                <div className='col-lg-3 col-sm-3 col-s-3 col-6'>True
                    <input checked type="radio" id="public_status_true" name="public_status" value={1} onChange={event =>onUpdate({...spellToEdit, public_status: event.target.value})}></input>
                </div>
                <div className='col-lg-3 col-sm-3 col-s-3 col-6'>False
                    <input type="radio" id="public_status_false" name="public_status" value={0} onChange={event =>onUpdate({...spellToEdit, public_status: event.target.value})}></input>
                </div>
            </section>
        } else {
            return <section className='row'>
                <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Viewable: </div>
                <div className='col-lg-3 col-sm-3 col-s-3 col-6'>True
                    <input type="radio" id="public_status_true" name="public_status" value={1} onChange={event =>onUpdate({...spellToEdit, public_status: event.target.value})}></input>
                </div>
                <div className='col-lg-3 col-sm-3 col-s-3 col-6'>False
                    <input checked type="radio" id="public_status_false" name="public_status" value={0} onChange={event =>onUpdate({...spellToEdit, public_status: event.target.value})}></input>
                </div>
            </section>
        }
    }

    function selected_modifiable() {
        if (spellToEdit.modifiable === Number(1)) {
            return <section className='row'>
                <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Quick Copy: </div>
                <label className='col-lg-3 col-sm-3 col-s-3 col-6' for="modifiable_true">True 
                    <input  checked type="radio" id="modifiable_true" name="modifiable" value={1} onChange={event =>onUpdate({...spellToEdit, modifiable: event.target.value})}></input>
                </label>
                 <label className='col-lg-3 col-sm-3 col-s-3 col-6' for="modifiable_false">False 
                    <input type="radio" id="modifiable_false" name="modifiable" value={0} onChange={event =>onUpdate({...spellToEdit, modifiable: event.target.value})}></input>
                </label>
            </section>
        } else {
            return <section className='row'>
                <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Quick Copy: </div>
                <label className='col-lg-3 col-sm-3 col-s-3 col-6' for="modifiable_true">True
                    <input type="radio" id="modifiable_true" name="modifiable" value={1} onChange={event =>onUpdate({...spellToEdit, modifiable: event.target.value})}></input>
                </label>
                <label className='col-lg-3 col-sm-3 col-s-3 col-6' for="modifiable_false">False
                    <input checked type="radio" id="modifiable_false" name="modifiable" value={0} onChange={event =>onUpdate({...spellToEdit, modifiable: event.target.value})}></input>
                </label>
            </section>
        }
    }
    
    // See the "Creating Custom Hooks" section in Porcello and Banks
    // for a short-cut to the cut-and-paste for value and onChange.
    return (<section className='single_spell'> 
        <div className='container'>
            { editMode ? 'Update' : "New" } Spell
        <form onSubmit={onSubmit} className="row spelldetails">
            <div className='col-sm-3 col-s-6 col-6'>Name: </div>
            <input
                value={spellToEdit.name}
                onChange={event => onUpdate({...spellToEdit, name: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Spell School: </div>
            <input
                value={spellToEdit.spell_school}
                onChange={event =>onUpdate({...spellToEdit, spell_school: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                list="spell_schools"
                required
            />
            <datalist id="spell_schools">
                <option value="Arcane Magic"></option>
                <option value="Holy Magic"></option>
                <option value="Elemental Magic"></option>
                <option value="Necromancy Magic"></option>
                <option value="Fire Magic"></option>
                <option value="Water Magic"></option>
                <option value="Earth Magic"></option>
                <option value="Lightning Magic"></option>
                <option value="Air Magic"></option>
                <option value="Ice Magic"></option>
                <option value="Life Magic"></option>
                <option value="Death Magic"></option>
                <option value="Light Magic"></option>
                <option value="Dark Magic"></option>
                <option value="Nature Magic"></option>
            </datalist>
            <div className='col-sm-3 col-s-6 col-6'>Action Type: </div>
            <input
                value={spellToEdit.action_type}
                onChange={event =>onUpdate({...spellToEdit, action_type: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                list='action_types'
                required
            />
            <datalist id="action_types">
                <option value="Main Action"></option>
                <option value="Reaction"></option>
                <option value="Ritual"></option>
                <option value="Instant"></option>
            </datalist>
            <div className='col-sm-3 col-s-6 col-6'>Effect Magnitude: </div>
            <input
                value={spellToEdit.effect_magnitude}
                onChange={event =>onUpdate({...spellToEdit, effect_magnitude: event.target.value})}
                type="number"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Effect Area: </div>
            <input
                value={spellToEdit.effect_area}
                onChange={event =>onUpdate({...spellToEdit, effect_area: event.target.value})}
                type="number"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Effect Range: </div>
            <input
                value={spellToEdit.effect_range}
                onChange={event =>onUpdate({...spellToEdit, effect_range: event.target.value})}
                type="number"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Effect Count: </div>
            <input
                value={spellToEdit.effect_count}
                onChange={event =>onUpdate({...spellToEdit, effect_count: event.target.value})}
                type="number"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Effect Duration: </div>
            <input
                value={spellToEdit.effect_duration}
                onChange={event =>onUpdate({...spellToEdit, effect_duration: event.target.value})}
                type="number"
                required
                className='col-sm-3 col-s-6 col-6'
            />
            <div className='col-sm-3 col-s-6 col-6'>Spell Cost: </div>
            <input
                value={spellToEdit.spell_cost}
                onChange={event =>onUpdate({...spellToEdit, spell_cost: event.target.value})}
                type="number"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Spell Resource: </div>
            <input
                value={spellToEdit.spell_resource}
                onChange={event =>onUpdate({...spellToEdit, spell_resource: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Source Name: </div>
            <div className='col-sm-3 col-s-6 col-6'>{spellToEdit.source_name}</div>
            <input
                value={spellToEdit.source_name}
                onChange={event =>onUpdate({...spellToEdit, source_name: event.target.value})}
                type="hidden"
                className='col-sm-3 col-s-6 col-6'
                display='hidden'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Source Link: </div>
            <input
                value={spellToEdit.source_link}
                onChange={event =>onUpdate({...spellToEdit, source_link: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            {selected_public_status()}
            {selected_modifiable()}
            <div className='col-sm-3 col-s-6 col-6'>Description: </div>
            <input className='col-12 description'
                value={spellToEdit.description}
                onChange={event =>onUpdate({...spellToEdit, description: event.target.value})}
                type="text"
                required
            />       
            <button className='col-sm-3 col-s-6 col-6' onClick={() => error_log()} type='submit'>{editMode ? 'Update' : 'Add'}</button>
            {allow_cancels()}
            {back()}
        </form>
        {error_log()}
        </div>
        </section>
    )
}