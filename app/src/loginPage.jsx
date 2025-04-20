export default function LoginPage({  loginMode = false, loggedIn, currUser, userToEdit, onLogin = f => f, onSignUp = f => f, onModeSwitch = f => f, onLogout = f => f, onUpdate = f => f, onSubmit = f => f, onCancelEdit = f => f, onSearch = f => f, onResetFilter = f => f}) {  
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

    function email_header() {
        if (!loginMode) {
            return <div className='col-lg-3 col-sm-6 col-s-6 col-6'>Email: </div>
        }
    }

    function email_field() {
        if (!loginMode) {
            return <input
                value={userToEdit.email}
                onChange={event =>onUpdate({...userToEdit, email: event.target.value})}
                type="text"
                id="email"
                name="email"
                className='col-lg-3 col-sm-6 col-s-6 col-6'
                required
            />
        }
    }

    const submitForm = async (event) => {
        event.preventDefault()
        if (loginMode) {
            onLogin()
        } else {
            onSignUp()
        }
    }

    function logout() {
        if (loggedIn) {
            return <div className='col-lg-3 col-sm-6 col-s-6 col-6'><button type="button" onClick={() => onLogout()}>Logout</button></div>
        } else {
            return <div className='col-lg-3 col-sm-6 col-s-6 col-6'></div>
        }
    }

    function switch_modes() {
        if (loginMode) {
            return <div className='col-lg-3 col-sm-6 col-s-6 col-6'><button type="button" onClick={() => onModeSwitch()}>Sign Up Mode</button></div>
        } else {
            return <div className='col-lg-3 col-sm-6 col-s-6 col-6'><button type="button" onClick={() => onModeSwitch()}>Login Mode</button></div>
        }
    }

    function login_or_signup() {
        if (loginMode) {
            return <div className='col-lg-3 col-sm-6 col-s-6 col-6'><button type="submit">Login</button></div>
        } else {
            return <div className='col-lg-3 col-sm-6 col-s-6 col-6'><button type="button" onClick={() => onSignUp(userToEdit)}>Sign Up</button></div>
        }
    }

    function logged_in() {
        if (loggedIn) {
            if (currUser.length === 0) {
                return <section className="single_spell">
                <div className='container'>
                { loginMode ? 'Login' : "Sign Up" }
                <form  onSubmit={loginMode ? onLogin : onSignUp} className="row spelldetails">
                <div className='col-lg-3 col-sm-6 col-s-6 col-6'>Username: </div>
                <input
                    value={userToEdit.username}
                    onChange={event => onUpdate({...userToEdit, username: event.target.value})}
                    type="text"
                    id="username"
                    name="username"
                    className='col-lg-3 col-sm-6 col-s-6 col-6'
                    required
                />
                <div className='col-lg-3 col-sm-6 col-s-6 col-6'>Password: </div>
                <input
                    value={userToEdit.password}
                    onChange={event =>onUpdate({...userToEdit, password: event.target.value})}
                    type="text"
                    id="password"
                    name="password"
                    className='col-lg-3 col-sm-6 col-s-6 col-6'
                    required
                />
                {login_or_signup()}
                {switch_modes()}
                </form>
                {error_log()}
                </div>
                </section>
            } else {
                return <section className='single_spell'>
                    <div className="container">
                        <div className='row-lg-3 row-sm-3 row-s-6 row-6'> User Page </div>
                        <div className="row spell">
                            <div className='col-12'>Username: {currUser.username}</div>
                            <div className='col-12'>Password: {currUser.password}</div>
                            <div className='col-12'>Email: {currUser.email}</div>
                        </div>
                        {logout()}
                    </div>
                </section>
            }
        } else {
            return <section className="single_spell">
            <div className='container'>
                { loginMode ? 'Login' : "Sign Up" }
                <form  onSubmit={loginMode ? onLogin : onSignUp} className="row spelldetails">
                <div className='col-lg-3 col-sm-6 col-s-6 col-6'>Username: </div>
                <input
                    value={userToEdit.username}
                    onChange={event => onUpdate({...userToEdit, username: event.target.value})}
                    type="text"
                    id="username"
                    name="username"
                    className='col-lg-3 col-sm-6 col-s-6 col-6'
                    required
                />
                <div className='col-lg-3 col-sm-6 col-s-6 col-6'>Password: </div>
                <input
                    value={userToEdit.password}
                    onChange={event =>onUpdate({...userToEdit, password: event.target.value})}
                    type="text"
                    id="password"
                    name="password"
                    className='col-lg-3 col-sm-6 col-s-6 col-6'
                    required
                />
                <input
                    value={userToEdit.admin}
                    onChange={event =>onUpdate({...userToEdit, admin: event.target.value})}
                    type="hidden"
                    id="admin"
                    name="admin"
                    className='col-lg-3 col-sm-6 col-s-6 col-6'
                    required
                />
                {email_header()}
                {email_field()}
                {login_or_signup()}
                {switch_modes()}
                </form>
                {error_log()}
            </div>
            </section>
        }
    }
    return <div> 
        {logged_in()}
    </div>
}