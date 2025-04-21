const { query } = require('express')
const express = require('express')
const cors = require('cors')

const DB = require('./db/SqliteDB')
const LoginController = require('./controllers/LoginController')
const loginController = new LoginController()

const app = express()
const port = 3001  // so we don't conflict with React on 3000


const myArgs = process.argv.slice(2)
if (myArgs[0] === '--test') {
    DB.reset()
}

app.use(cors())

let corsOptions = {
    origin : ['http://localhost:3000'],
 }

// Tell Express to parse the body as JSON.
// (This is a different format than data sent by an HTML form.)
app.use(express.json());

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

// This sets a CORS header.  It allows requests from JS 
// that didn't originate here
// !!!!! Don't ever use "*" in production!!!
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    // Might need to add "set-cookie" to Allow-Headers
    res.setHeader("Access-Control-Allow-Headers", "content-type")
    res.setHeader("Access-Control-Allow-Methods", ["POST", "DELETE"])
    // Should allow clients to ask for credentials
    res.setHeader("Access-Control-Allow-Credentials", "true")
    // Currently exposing all, check which I need for sessions
    res.setHeader('Access-Control-Expose-Headers', '*')
    next();
});

const session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'This should be a random, unguessable string'
}))

// middleware to determine if authenticated

function isAuthenticated(req, res, next) {

    console.log('Enter isAuthenticated')
    console.log(req.body.user)

    // If there is an active session, and that session has a user property,
    // continue to the requested route.
    if (req.session.user) {
        console.log('Already logged in... Moving on')
        next()
    } else {
        console.log('Save current destination in session so we can continue on later: ' + req.originalUrl)
        req.session.returnTo = req.originalUrl
        console.log('redirecting to original page')
        loginController.requestLogin(req, res)
        next()
    }
}

app.options('/spells', (req, res) => {
    console.log('Received options from preflight')
    console.log(req.headers)
    res.send()
})

app.options('/collections', (req, res) => {
    console.log('Received options from preflight')
    console.log(req.headers)
    res.send()
})

app.options('/users', (req, res) => {
    console.log('Received options from preflight')
    console.log(req.headers)
    res.send()
})

app.options('/logout', (req, res) => {
    console.log('Received options from preflight')
    console.log(req.headers)
    res.send()
})

app.options('/login', (req, res) => {
    console.log('Received options from preflight')
    console.log(req.headers)
    res.send()
})

if (myArgs[0] === '--test') {
    app.get('/reset', (req, res) => {
        DB.reset();
        res.send('reset')
    })
}

//res.json({ user: req.session.user });
// All of the ones below has to send this


app.get('/init', (req, res) => {
    require('./db/SqliteDB').initialize()
    res.send('Initialized.')
})

app.get('/reset', (req, res) => {
    require('./db/SqliteDB').reset()
    res.send('Reset.')
})

app.get('/spells_search?', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    setTimeout(async () => res.json(await DB.spellsearch(req.query)), delay)
})

app.get('/spells/:id/collections', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    console.log('Getting collections with that spell')
    setTimeout(async () => res.json(await DB.collection_with_spell(req.query)), delay)
})

app.get('/spells/:id/not_collections', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    console.log('Getting collections without that spell')
    setTimeout(async () => res.json(await DB.collection_without_spell(req.query)), delay)
})

app.get('/spells', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    setTimeout(async () => res.json(await DB.allSpells()), delay)
})

app.post('/spells', isAuthenticated, async (req, res) => {
    console.log("About to create a new spell");

    // With JSON data, req.body is the entire parsed JSON object
    console.log(req.body.item);
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        DB.createSpell(req.body.item).then((data) => {
            console.log("Sending:  ")
            console.log(data)
            res.json(data);
        })
    }
})

app.post('/spells/:id', isAuthenticated, async (req, res) => {
    let uniqId = req.params.id;
    console.log("About to modify spell with Id " + uniqId);
    console.log(req.body.item)

    // Using != instead of !== here because :id matches as a string, 
    // while the body (parsed from JSON) will be a Number.
    if (uniqId != req.body.item.id) {
        res.status(500)
        res.send({message: "Problem with request format:  Id is inconsistent."})
        return;
    }

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body.item == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        DB.updateSpell(req.body.item).then((data) => {
            res.json(data);
        })
    }
})

app.delete('/spells/:id', isAuthenticated, async (req, res) => {
    let uniqId = req.params.id;
    console.log("About to delete spell with primary key " + uniqId);
    console.log(req.body.item)

    if (uniqId != req.body.item.id) {
        res.status(500)
        res.send({message: "Problem with request format:  Id is inconsistent."})
        return;
    }

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body.item == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Delete request was unable to parse data' })
    } else {
        DB.deleteSpell(req.body.item).then((data) => {
            res.json(data);
        })
    }
})

app.get('/collections_search?', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    setTimeout(async () => res.json(await DB.collectionsearch(req.query)), delay)
})

app.get('/collections/:id/spells', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    console.log('Getting spells in collection')
    setTimeout(async () => res.json(await DB.spells_in_collection(req.query)), delay)
})

app.get('/collections/:id/not_spells', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    console.log('Getting spells not in collection')
    setTimeout(async () => res.json(await DB.spells_not_in_collection(req.query)), delay)
})

app.get('/collections', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    console.log('Getting all collections')
    setTimeout(async () => res.json(await DB.allCollections()), delay)
})

app.post('/collections', isAuthenticated, async (req, res) => {
    console.log("About to create a new collection");

    // With JSON data, req.body is the entire parsed JSON object
    console.log(req.body.item);
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        DB.createCollection(req.body.item).then((data) => {
            console.log("Sending:  ")
            console.log(data)
            res.json(data);
        })
    }
})

app.post('/collections/:id', isAuthenticated, async (req, res) => {
    let uniqId = req.params.id;
    console.log("About to modify collection with Id " + uniqId);
    console.log(req.body.item)

    // Using != instead of !== here because :id matches as a string, 
    // while the body (parsed from JSON) will be a Number.
    if (uniqId != req.body.item.id) {
        res.status(500)
        res.send({message: "Problem with request format:  Id is inconsistent."})
        return;
    }

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body.item == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        DB.updateCollection(req.body.item).then((data) => {
            res.json(data);
        })
    }
})

app.delete('/collections/:id', isAuthenticated, async (req, res) => {
    let uniqId = req.params.id;
    console.log("About to delete collection with primary key " + uniqId);
    console.log(req.body.item)

    if (uniqId != req.body.item.id) {
        res.status(500)
        res.send({message: "Problem with request format:  Id is inconsistent."})
        return;
    }

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body.item == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Delete request was unable to parse data' })
    } else {
        DB.deleteCollection(req.body.item).then((data) => {
            res.json(data);
        })
    }
})

app.get('/users_search?', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    setTimeout(async () => res.json(await DB.usersearch(req.query)), delay)
})

app.get('/users/spells', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    console.log('Getting spells by the user')
    setTimeout(async () => res.json(await DB.spells_by_user(req.query)), delay)
})

app.get('/users/collections', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    console.log('Getting collections by the user')
    setTimeout(async () => res.json(await DB.collections_by_user(req.query)), delay)
})

app.get('/users', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    console.log('Getting all users')
    setTimeout(async () => res.json(await DB.allUsers()), delay)
})

app.post('/users', async (req, res) => {
    console.log("About to create a new user");
    console.log(req.body.user)

    if (req.body.user == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        //console.log(res.session.user)
        DB.createUser(req.body.user).then((data) => {
            console.log("Sending:  ")
            console.log(data)
            let newData = {data, req}
            //res.json({ user: req.session.user });
            res.json(data);
        })
    }
})

app.post('/users/:id', isAuthenticated, async (req, res) => {
    let uniqId = req.params.id;
    console.log("About to modify user with Id " + uniqId);
    console.log(req.body.item)

    // Using != instead of !== here because :id matches as a string, 
    // while the body (parsed from JSON) will be a Number.
    if (uniqId != req.body.item.id) {
        res.status(500)
        res.send({message: "Problem with request format:  Id is inconsistent."})
        return;
    }

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body.item == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        DB.updateUser(req.body.item).then((data) => {
            res.json(data);
        })
    }
})

app.delete('/users/:id', isAuthenticated, async (req, res) => {
    let uniqId = req.params.id;
    console.log("About to delete user with primary key " + uniqId);
    console.log(req.body.item)

    if (uniqId != req.body.item.id) {
        res.status(500)
        res.send({message: "Problem with request format:  Id is inconsistent."})
        return;
    }

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body.item == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Delete request was unable to parse data' })
    } else {
        DB.deleteUser(req.body.item).then((data) => {
            res.json(data);
        })
    }
})

app.get('/connections', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    console.log('Getting all connections')
    setTimeout(async () => res.json(await DB.allConnections()), delay)
})

app.post('/connections', async (req, res) => {
    console.log("About to create a new connection");
    console.log(req.body.item)

    if (req.body.item == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        //console.log(res.session.user)
        DB.createConnection(req.body.item).then((data) => {
            console.log("Sending:  ")
            console.log(data)
            let newData = {data, req}
            //res.json({ user: req.session.user });
            res.json(data);
        })
    }
})

app.delete('/connections/:id', isAuthenticated, async (req, res) => {
    console.log("About to delete connection");
    console.log(req.body.item)

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body.item == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Delete request was unable to parse data' })
    } else {
        DB.deleteConnection(req.body.item).then((data) => {
            res.json(data);
        })
    }
})


app.post('/login', (req, res) => {
    loginController.requestLogin(req, res)
    DB.userlogin(req.body.user).then((data) => {
        if (data.length >= 1) {
            //console.log('login data', data)
            req.session.save(err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error saving session')
                }
                res.session = req.session
                res.send(data[0]);
            });
        } else {
            res.status(401).send('Invalid credentials')
        }
    })
})

app.post('/signup', (req, res) => {
    //loginController.requestLogin(req, res)
    DB.createUser(req.body).then((data) => {
        if (data.length === 1) {
            req.session.user = data[0].username
            req.session.save(err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error saving session')
                }
                res.session = req.session
                res.session.save()
                res.send(data[0]);
            });
        } else {
            res.status(401).send('Invalid credentials')
        }
    })
})

app.get('/api/session', (req, res) => {
    if (req.session.username) {
        res.status(200).json({ username: req.session.username })
    } else {
        res.status(401).send('Unauthorized');
    }
})

// Logout
app.post('/logout', (req, res) => {
    loginController.logout(req, res)
    DB.userlogin(req.body.user).then((data) => {
        if (data.length >= 1) {
            res.send(data[0]);
        } else {
            res.status(401).send('Invalid credentials')
        }
    })
})

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))