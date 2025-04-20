// Name: Phuc Le
// Currently having issues with input boxes deselecting after every change in input
import { useNavigate } from 'react-router-dom'

export default function SearchCollectionForm({ editMode, collectionToEdit, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f, onSearch = f => f, onResetFilter = f => f}) {
    const navigate = useNavigate()
    function error_log()  {
        if (collectionToEdit.errors.length !== 0) {
            return <div>Error List:
                <ul>
                    {collectionToEdit.errors.map((item, key) => (
                    <li>{item}</li>
                    ))}
                </ul>
            </div>
        }
    }
    
    // See the "Creating Custom Hooks" section in Porcello and Banks
    // for a short-cut to the cut-and-paste for value and onChange.
    return (<section className='single_spell'>
        <div className='container'>
            Search Collections
        <form onSubmit={onSubmit} className="row spelldetails">
            <div className='col-sm-3 col-s-6 col-6'>Name: </div>
            <input
                value={collectionToEdit.name}
                onChange={event => onUpdate({...collectionToEdit, name: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Source Name: </div>
            <input
                value={collectionToEdit.source_name}
                onChange={event =>onUpdate({...collectionToEdit, source_name: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Source Link: </div>
            <input
                value={collectionToEdit.source_link}
                onChange={event =>onUpdate({...collectionToEdit, source_link: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Description: </div>
            <input className='col-12 description'
                value={collectionToEdit.description}
                onChange={event =>onUpdate({...collectionToEdit, description: event.target.value})}
                type="text"
                required
            />
            {/* <button> by default will submit a form.  If you don't want this behavior, set the type to 'button'*/}
            <button className='col-sm-3 col-s-6 col-6' onClick={() => navigate(`/collections/new`)} type='submit'>Add Collection</button>
            <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onSearch(collectionToEdit)}>Search Using Filters</button>
            <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onCancelEdit(collectionToEdit)}>Clear Filter Boxes</button>
            <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onResetFilter()}>Reset List</button>
        </form>
        {error_log()}
        </div>
        </section>
    )
}