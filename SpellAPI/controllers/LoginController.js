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
        if (req.body.user.user !== req.session.user) {
            console.log('User from request not the user in session')
            //res.redirect(returnTo ?? '/login')
        } else {
            console.log('Creating new session')
            req.session.regenerate((err) => {
                if (err) next(err)
                req.session.user = req.body.user.username
                console.log('Session created')
                console.log(req.session)
            })
        }
    }
    
    logout(req, res) {
        req.session.destroy()
    }
}

module.exports = LoginController