// Name: Phuc Le
// Currently having issues with input boxes deselecting after every change in input
import { useNavigate } from 'react-router-dom'

export default function SearchUserForm({ editMode, userToEdit, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f, onSearch = f => f, onResetFilter = f => f}) {
    const navigate = useNavigate()
    function error_log()  {
        if (userToEdit.errors.length !== 0) {
            return <div>Error List:
                <ul>
                    {userToEdit.errors.map((item, key) => (
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
            Search Users
        <form onSubmit={onSubmit} className="row spelldetails">
            <div className='col-sm-3 col-s-6 col-6'>Username: </div>
            <input
                value={userToEdit.username}
                onChange={event => onUpdate({...userToEdit, username: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-sm-3 col-s-6 col-6'>Email: </div>
            <input
                value={userToEdit.email}
                onChange={event =>onUpdate({...userToEdit, email: event.target.value})}
                type="text"
                className='col-sm-3 col-s-6 col-6'
                required
            />
            {/* <button> by default will submit a form.  If you don't want this behavior, set the type to 'button'*/}
            <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onSearch(userToEdit)}>Search Using Filters</button>
            <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onCancelEdit(userToEdit)}>Clear Filter Boxes</button>
            <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onResetFilter()}>Reset List</button>
        </form>
        {error_log()}
        </div>
        </section>
    )
}