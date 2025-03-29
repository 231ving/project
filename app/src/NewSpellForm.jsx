// Name: Phuc Le

export default function AddSpellForm({ editMode = false, spellToEdit, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f }) {
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
        <div id='updateForm'>
            { editMode ? 'Update' : "New" } Spell
        <form onSubmit={onSubmit} className="spelldetails">
            <label for="name">Name: </label>
            <input
                value={spellToEdit.name}
                onChange={event => onUpdate({...spellToEdit, name: event.target.value})}
                type="text"
                placeholder="name"
                required
            />
            <label for="spell_school">Spell School: </label>
            <input
                value={spellToEdit.spell_school}
                onChange={event =>onUpdate({...spellToEdit, spell_school: event.target.value})}
                type="name"
                required
            />
            <label for="action_type">Action_type: </label>
            <input
                value={spellToEdit.action_type}
                onChange={event =>onUpdate({...spellToEdit, action_type: event.target.value})}
                type="name"
                required
            />
            <label for="effect_magnitude">Effect Magnitude: </label>
            <input
                value={spellToEdit.effect_magnitude}
                onChange={event =>onUpdate({...spellToEdit, effect_magnitude: event.target.value})}
                type="name"
                required
            />
            <label for="effect_area">Effect Area: </label>
            <input
                value={spellToEdit.effect_area}
                onChange={event =>onUpdate({...spellToEdit, effect_area: event.target.value})}
                type="name"
                required
            />
            <label for="effect_range">Effect Range: </label>
            <input
                value={spellToEdit.effect_range}
                onChange={event =>onUpdate({...spellToEdit, effect_range: event.target.value})}
                type="name"
                required
            />
            <label for="effect_count">Effect Count: </label>
            <input
                value={spellToEdit.effect_count}
                onChange={event =>onUpdate({...spellToEdit, effect_count: event.target.value})}
                type="name"
                required
            />
            <label for="effect_duration">Effect Duration: </label>
            <input
                value={spellToEdit.effect_duration}
                onChange={event =>onUpdate({...spellToEdit, effect_duration: event.target.value})}
                type="name"
                required
            />
            <label for="spell_cost">Spell Cost: </label>
            <input
                value={spellToEdit.spell_cost}
                onChange={event =>onUpdate({...spellToEdit, spell_cost: event.target.value})}
                type="name"
                required
            />
            <label for="spell_resource">Spell Resource: </label>
            <input
                value={spellToEdit.spell_resource}
                onChange={event =>onUpdate({...spellToEdit, spell_resource: event.target.value})}
                type="name"
                required
            />
            <label for="source_name">Source Name: </label>
            <input
                value={spellToEdit.source_name}
                onChange={event =>onUpdate({...spellToEdit, source_name: event.target.value})}
                type="name"
                required
            />
            <label for="source_link">Source Link: </label>
            <input
                value={spellToEdit.source_link}
                onChange={event =>onUpdate({...spellToEdit, source_link: event.target.value})}
                type="name"
                required
            />
            <label for="public_status">Publicly Viewable: </label>
            <select id="public_status" defaultValue={spellToEdit.public_status} onChange={event =>onUpdate({...spellToEdit, public_status: event.target.value})}>
                <option value="1" onChange={event =>onUpdate({...spellToEdit, public_status: event.target.value})}>True</option>
                <option value="0" onChange={event =>onUpdate({...spellToEdit, public_status: event.target.value})}>False</option>
            </select>
            <label for="modifiable">Quick Modifiable: </label>
            <select id="modifiable"defaultValue={spellToEdit.modifiable} onChange={event =>onUpdate({...spellToEdit, public_status: event.target.value})}>
                <option value="1" onChange={event =>onUpdate({...spellToEdit, modifiable: event.target.value})}>True</option>
                <option value="0" onChange={event =>onUpdate({...spellToEdit, modifiable: event.target.value})}>False</option>
            </select>
            <label for="description">Description: </label>
            <input className="description"
                value={spellToEdit.description}
                onChange={event =>onUpdate({...spellToEdit, description: event.target.value})}
                type="name"
                required
            />
            {/* This button should submit the form */}
            <button onClick={() => error_log()}>{editMode ? 'Update' : 'Add'}</button>
            
            {/* <button> by default will submit a form.  If you don't want this behavior, set the type to 'button'*/}
            <button type='button' onClick={onCancelEdit}>Cancel</button>
        </form>
        <div>Error List:
            <ul>
            {spellToEdit.errors.map((item, key) => (
                <li>{item}</li>
            ))}
            </ul>
            </div>
        </div>
    )
}