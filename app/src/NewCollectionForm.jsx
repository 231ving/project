// Name: Phuc Le
// Currently having issues with input boxes deselecting after every change in input
import { useLocation, useNavigate } from 'react-router-dom'

export default function AddCollectionForm({ editMode = false, collectionToEdit, currUser, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f, onCancelCopy = f => f, onSearch = f => f, onResetFilter = f => f}) {
    let location = useLocation()
    const navigate = useNavigate()
    if (!editMode && collectionToEdit.source_name !== currUser.username) {
        onUpdate({...collectionToEdit, source_name: currUser.username})
    }

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

    function back() {
        if (collectionToEdit.id === 0) {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => navigate(`/collections`)}>Back</button>
        } else {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => navigate(`/collections/${collectionToEdit.id}`)}>Back</button>
        }
    }
  
    function allow_cancel() {
        if (editMode) {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onCancelEdit(collectionToEdit)}>Cancel Edit</button>
        } else if (collectionToEdit.id !== 0 ) {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onCancelCopy(collectionToEdit)}>Cancel Quick Copy</button>
        }
    }

    function selected_public_status() {
        if (collectionToEdit.public_status === Number(1)) {
            return <section className='row'>
                <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Viewable: </div>
                <div className='col-lg-3 col-sm-3 col-s-3 col-6'>True
                    <input checked type="radio" id="public_status_true" name="public_status" value={1} onChange={event =>onUpdate({...collectionToEdit, public_status: event.target.value})}></input>
                </div>
                <div className='col-lg-3 col-sm-3 col-s-3 col-6'>False
                    <input type="radio" id="public_status_false" name="public_status" value={0} onChange={event =>onUpdate({...collectionToEdit, public_status: event.target.value})}></input>
                </div>
            </section>
        } else {
            return <section className='row'>
                <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Viewable: </div>
                <div className='col-lg-3 col-sm-3 col-s-3 col-6'>True
                    <input type="radio" id="public_status_true" name="public_status" value={1} onChange={event =>onUpdate({...collectionToEdit, public_status: event.target.value})}></input>
                </div>
                <div className='col-lg-3 col-sm-3 col-s-3 col-6'>False
                    <input checked type="radio" id="public_status_false" name="public_status" value={0} onChange={event =>onUpdate({...collectionToEdit, public_status: event.target.value})}></input>
                </div>
            </section>
        }
    }

    function selected_modifiable() {
        if (collectionToEdit.modifiable === Number(1)) {
            return <section className='row'>
                <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Quick Copy: </div>
                <label className='col-lg-3 col-sm-3 col-s-3 col-6' for="modifiable_true">True 
                    <input  checked type="radio" id="modifiable_true" name="modifiable" value={1} onChange={event =>onUpdate({...collectionToEdit, modifiable: event.target.value})}></input>
                </label>
                 <label className='col-lg-3 col-sm-3 col-s-3 col-6' for="modifiable_false">False 
                    <input type="radio" id="modifiable_false" name="modifiable" value={0} onChange={event =>onUpdate({...collectionToEdit, modifiable: event.target.value})}></input>
                </label>
            </section>
        } else {
            return <section className='row'>
                <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Quick Copy: </div>
                <label className='col-lg-3 col-sm-3 col-s-3 col-6' for="modifiable_true">True
                    <input type="radio" id="modifiable_true" name="modifiable" value={1} onChange={event =>onUpdate({...collectionToEdit, modifiable: event.target.value})}></input>
                </label>
                <label className='col-lg-3 col-sm-3 col-s-3 col-6' for="modifiable_false">False
                    <input checked type="radio" id="modifiable_false" name="modifiable" value={0} onChange={event =>onUpdate({...collectionToEdit, modifiable: event.target.value})}></input>
                </label>
            </section>
        }
    }
    
    // See the "Creating Custom Hooks" section in Porcello and Banks
    // for a short-cut to the cut-and-paste for value and onChange.
    return (<section className='single_spell'>
        <div className='container'>
            { editMode ? 'Update' : "New" } Collection
        <form onSubmit={onSubmit} className="row spelldetails">
            <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Name: </div>
            <input
                value={collectionToEdit.name}
                onChange={event => onUpdate({...collectionToEdit, name: event.target.value})}
                type="text"
                id="name"
                name="name"
                className='col-lg-6 col-sm-6 col-s-6 col-12'
                required
            />
            <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Source Name: </div>
            <div className='col-lg-6 col-sm-6 col-s-6 col-12'>{collectionToEdit.source_name}</div>
            <input
                value={collectionToEdit.source_name}
                onChange={event =>onUpdate({...collectionToEdit, source_name: event.target.value})}
                type="hidden"
                id="source_name"
                name="source_name"
                className='col-lg-6 col-sm-6 col-s-6 col-12'
                display='hidden'
                required
            />
            <div className='col-lg-6 col-sm-6 col-s-6 col-12'>Source Link: </div>
            <input
                value={collectionToEdit.source_link}
                onChange={event =>onUpdate({...collectionToEdit, source_link: event.target.value})}
                type="text"
                id="source_link"
                name="source_link"
                className='col-lg-6 col-sm-6 col-s-6 col-12'
                required
            />
            {selected_public_status()}
            {selected_modifiable()}
            <div className='col-12'>Description: </div>
            <input className="col-12 description"
                value={collectionToEdit.description}
                onChange={event =>onUpdate({...collectionToEdit, description: event.target.value})}
                type="text"
                id="description"
                name="description"
                required
            />
            <button className='col-sm-3 col-s-6 col-6' onClick={() => error_log()} type='submit'>{editMode ? 'Update' : 'Add'}</button>
            {allow_cancel()}
            {back()}
        </form>
        {error_log()}
        </div>
        </section>
    )
}