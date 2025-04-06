const SqliteDB = require("../db/SqliteDB")

class LoginController {

    // Respond to the POST from the login page.
    requestLogin(req, res, next) {
        console.log('Request body')
        console.log(req.body)
       
        let returnTo = req.session.returnTo

        // For simplicity the password is always just the reverse of the 
        // login name.  In a real application, we would make a DB 
        // access to check the username and password.
        let found_user = SqliteDB.usersearch(req.body)
        console.log(found_user)
        if (req.body.password !== found_user.password) {
            // If the password is incorrect, re-render the login form.
            res.redirect(returnTo ?? '/users')
        } else {
            console.log('Creating new session')
            req.session.regenerate((err) => {
                if (err) next(err)
                req.session.user = req.body.username
                console.log('Session created')
                console.log(req.session)
                res.redirect(returnTo ?? '/spells')
            })
        }
    }
    
    logout(req, res) {
        req.session.destroy(function(){
            res.redirect('/login')
        })
    }
}

module.exports = LoginController