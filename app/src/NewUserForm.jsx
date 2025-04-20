// Name: Phuc Le
// Currently having issues with input boxes deselecting after every change in input
import { useLocation, useNavigate } from 'react-router-dom'

export default function AddUserForm({ editMode = false, userToEdit, currUser, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f}) {
    let location = useLocation()
    const navigate = useNavigate()
    if (!editMode && userToEdit.source_name !== currUser.username) {
        onUpdate({...userToEdit, source_name: currUser.username})
    }

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

    function back() {
        if (userToEdit.id === 0) {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => navigate(`/users`)}>Back</button>
        } else {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => navigate(`/users/${userToEdit.id}`)}>Back</button>
        }
    }
  
    function allow_cancel() {
        if (editMode) {
            return <button className='col-sm-3 col-s-6 col-6' type='button' onClick={() => onCancelEdit(userToEdit)}>Cancel Edit</button>
        } else if (userToEdit.id !== 0 ) {
        }
    }

    function admin_access() {
        if (currUser.admin === 1) {
            return <div className='col-6'>Admin: </div>
        }
    }

    function admin_input() {
        if (currUser.admin === 1) {
            return <input
            value={userToEdit.admin}
            onChange={event =>onUpdate({...userToEdit, admin: event.target.value})}
            type="number"
            id="admin"
            name="admin"
            className='col-6'
            max="1"
            min="0"
            required
        />
        }
    }
    
    // See the "Creating Custom Hooks" section in Porcello and Banks
    // for a short-cut to the cut-and-paste for value and onChange.
    return (<section className='single_spell'>
        <div className='container'>
            { editMode ? 'Update' : "New" } User
        <form onSubmit={onSubmit} className="row spelldetails">
            <div className='col-6'>Username: </div>
            <input
                value={userToEdit.username}
                onChange={event => onUpdate({...userToEdit, username: event.target.value})}
                type="text"
                id="username"
                name="username"
                className='col-6'
                required
            />
            <div className='col-6'>Password: </div>
            <input
                value={userToEdit.password}
                onChange={event =>onUpdate({...userToEdit, password: event.target.value})}
                type="text"
                id="password"
                name="password"
                className='col-6'
                required
            />
            <div className='col-6'>Email: </div>
            <input
                value={userToEdit.email}
                onChange={event =>onUpdate({...userToEdit, email: event.target.value})}
                type="text"
                id="email"
                name="email"
                className='col-6'
                required
            />
            <input
                value={userToEdit.id}
                onChange={event =>onUpdate({...userToEdit, id: event.target.value})}
                type="hidden"
                id="id"
                name="id"
                display='hidden'
                className='col-6'
                required
            />
            {admin_access()}
            {admin_input()}
            <button className='col-sm-3 col-s-6 col-6' onClick={() => error_log()} type='submit'>{editMode ? 'Update' : 'Add'}</button>
            {allow_cancel()}
            {back()}
        </form>
        {error_log()}
        </div>
        </section>
    )
}