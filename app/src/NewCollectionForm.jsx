// Name: Phuc Le
// Currently having issues with input boxes deselecting after every change in input
import { useLocation } from 'react-router-dom'

export default function AddCollectionForm({ editMode = false, collectionToEdit, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f, onSearch = f => f, onResetFilter = f => f}) {
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

    let location = useLocation()
    function return_main() {
        if (location.path === `/collections/${collectionToEdit.id}`) {
            return <div className='col-s-3 col-6 view_back'><a className='button' href={`/collections`} type='submit' onClick='return error_log()'>{editMode ? 'Update' : 'Add'}</a></div>
        } else {
            return <button className='col-s-3 col-6 view_back' onClick={() => error_log()}>{editMode ? 'Update' : 'Add'}</button>
        }
    }
  
    function allow_cancel() {
        if (location.pathname === `/collections`) {
            return <button className='col-s-3 col-6 view_back' type='button' onClick={onCancelEdit}>Cancel</button>
        } else {
            return
        }
    }

    function selected_public_status() {
        if (collectionToEdit.public_status === Number(1)) {
            return <section className='row'>
                <div className='col-2'>Viewable: </div>
                <div className='col-1'>True
                    <input checked type="radio" id="public_status_true" name="public_status" value="1" onChange={event =>onUpdate({...collectionToEdit, public_status: event.target.value})}></input>
                </div>
                <div className='col-1'>False
                    <input type="radio" id="public_status_false" name="public_status" value="0" onChange={event =>onUpdate({...collectionToEdit, public_status: event.target.value})}></input>
                </div>
            </section>
        } else {
            return <section className='row'>
                <div className='col-2'>Viewable: </div>
                <div className='col-1'>True
                    <input type="radio" id="public_status_true" name="public_status" value="1" onChange={event =>onUpdate({...collectionToEdit, public_status: event.target.value})}></input>
                </div>
                <div className='col-1'>False
                    <input checked type="radio" id="public_status_false" name="public_status" value="0" onChange={event =>onUpdate({...collectionToEdit, public_status: event.target.value})}></input>
                </div>
            </section>
        }
    }

    function selected_modifiable() {
        if (collectionToEdit.modifiable === Number(1)) {
            return <section className='row'>
                <div className='col-2'>Quick Copy: </div>
                <label className='col-1' for="modifiable_true">True 
                    <input  checked type="radio" id="modifiable_true" name="modifiable" value="1" onChange={event =>onUpdate({...collectionToEdit, modifiable: event.target.value})}></input>
                </label>
                 <label className='col-1' for="modifiable_false">False 
                    <input type="radio" id="modifiable_false" name="modifiable" value="0" onChange={event =>onUpdate({...collectionToEdit, modifiable: event.target.value})}></input>
                </label>
            </section>
        } else {
            return <section className='row'>
                <div className='col-2'>Quick Copy: </div>
                <label className='col-1' for="modifiable_true">True
                    <input type="radio" id="modifiable_true" name="modifiable" value="1" onChange={event =>onUpdate({...collectionToEdit, modifiable: event.target.value})}></input>
                </label>
                <label className='col-1' for="modifiable_false">False
                    <input checked type="radio" id="modifiable_false" name="modifiable" value="0" onChange={event =>onUpdate({...collectionToEdit, modifiable: event.target.value})}></input>
                </label>
            </section>
        }
    }
    
    // See the "Creating Custom Hooks" section in Porcello and Banks
    // for a short-cut to the cut-and-paste for value and onChange.
    return (
        <div className='container-fluid updateForm'>
            { editMode ? 'Update' : "New" } Collection
        <form onSubmit={onSubmit} className="row spelldetails">
            <div className='col-lg-2 col-sm-3 col-s-4 col-3'>Name: </div>
            <input
                value={collectionToEdit.name}
                onChange={event => onUpdate({...collectionToEdit, name: event.target.value})}
                type="text"
                id="name"
                name="name"
                className='col-lg-2 col-sm-3 col-s-4 col-3'
                required
            />
            <div className='col-lg-2 col-sm-3 col-s-4 col-3'>Source Name: </div>
            <input
                value={collectionToEdit.source_name}
                onChange={event =>onUpdate({...collectionToEdit, source_name: event.target.value})}
                type="text"
                id="source_name"
                name="source_name"
                className='col-lg-2 col-sm-3 col-s-4 col-3'
                required
            />
            <div className='col-lg-2 col-sm-3 col-s-4 col-3'>Source Link: </div>
            <input
                value={collectionToEdit.source_link}
                onChange={event =>onUpdate({...collectionToEdit, source_link: event.target.value})}
                type="text"
                id="source_link"
                name="source_link"
                className='col-lg-2 col-sm-3 col-s-4 col-3'
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
            {/* This button should submit the form */}
            {return_main()}
            
            {/* <button> by default will submit a form.  If you don't want this behavior, set the type to 'button'*/}
            {allow_cancel()}
            <button className='col-s-3 col-6' type='button' onClick={() => onSearch(collectionToEdit)}>Search Using Filters</button>
            <button className='col-s-3 col-6' type='button' onClick={onResetFilter}>Reset Filter</button>

        </form>
        {error_log()}
        </div>
    )
}