import { useLocation } from 'react-router-dom'

export default function LoginPage({  editMode = false, editAccountMode, userToEdit, onCancelEditAccountMode = f => f, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f, onSearch = f => f, onResetFilter = f => f}) {
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

    let location = useLocation()
    function return_main() {
        if (location.path === `/users/${userToEdit.id}`) {
            return <a className='button' href={`/users`} type='submit' onClick='return error_log()'>{editMode ? 'Login' : 'Sign Up'}</a>
        } else {
            return <button onClick={() => error_log()}>{editMode ? 'Login' : 'Sign Up'}</button>
        }
    }
  
    function allow_cancel() {
        if (location.pathname === `/users`) {
            return <button className='col-lg-3 col-sm-3 col-s-6 col-6' type='button' onClick={onCancelEdit}>Cancel</button>
        } else {
            return
        }
    }

    function sign_in() {
        if (!editAccountMode) {
            return (
            <section>
                <div className='col-lg-3 col-sm-3 col-s-6 col-6'>Email: </div>
                <input
                    value={userToEdit.email}
                    onChange={event =>onUpdate({...userToEdit, email: event.target.value})}
                    type="text"
                    id="email"
                    name="email"
                    className='col-lg-3 col-sm-3 col-s-6 col-6'
                    required
                />
            </section>)
        }
    }

    return (
        <div className='container updateForm'>
            { editMode ? 'Login' : "Sign Up" }
            <form onSubmit={onSubmit} className="row spelldetails">
            <div className='col-lg-3 col-sm-3 col-s-6 col-6'>Username: </div>
            <input
                value={userToEdit.username}
                onChange={event => onUpdate({...userToEdit, username: event.target.value})}
                type="text"
                id="username"
                name="username"
                className='col-lg-3 col-sm-3 col-s-6 col-6'
                required
            />
            <div className='col-lg-3 col-sm-3 col-s-6 col-6'>Password: </div>
            <input
                value={userToEdit.password}
                onChange={event =>onUpdate({...userToEdit, password: event.target.value})}
                type="text"
                id="password"
                name="password"
                className='col-lg-3 col-sm-3 col-s-6 col-6'
                required
            />
            {sign_in()}
            <div className='col-lg-3 col-sm-3 col-s-6 col-6'><button type="submit">Submit</button></div>
            </form>
    </div>
    )}