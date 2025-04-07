// Name: Phuc Le
// Currently having issues with input boxes deselecting after every change in input
import { useNavigate } from 'react-router-dom'

export default function SearchSpellForm({ editMode, spellToEdit, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f, onSearch = f => f, onResetFilter = f => f}) {
    const navigate = useNavigate()
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
    
    // See the "Creating Custom Hooks" section in Porcello and Banks
    // for a short-cut to the cut-and-paste for value and onChange.
    return (
        <div className='container updateForm'>
            Search Spells
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
            <div className='col-sm-3 col-s-6 col-6'>Spell Resource: </div>
            <input
                value={spellToEdit.spell_resource}
                onChange={event =>onUpdate({...spellToEdit, spell_resource: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Source Name: </div>
            <input
                value={spellToEdit.source_name}
                onChange={event =>onUpdate({...spellToEdit, source_name: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
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
            <div className='col-sm-3 col-s-6 col-6'>Description: </div>
            <input className='col-12 description'
                value={spellToEdit.description}
                onChange={event =>onUpdate({...spellToEdit, description: event.target.value})}
                type="text"
                required
            />
            
            {/* <button> by default will submit a form.  If you don't want this behavior, set the type to 'button'*/}
            <button className='col-sm-3 col-s-6 col-6' onClick={() => navigate(`/spells/new`)} type='submit'>Add Spell</button>
            <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onSearch(spellToEdit)}>Search Using Filters</button>
            <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onCancelEdit(spellToEdit)}>Clear Filter Boxes</button>
            <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onResetFilter()}>Reset List</button>
        </form>
        {error_log()}
        </div>
    )
}