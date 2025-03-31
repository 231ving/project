const { query } = require('express')
const express = require('express')
const cors = require('cors')
const SpellDB = require('./db/SqliteSpellDB')

const app = express()
const port = 3001  // so we don't conflict with React on 3000


const myArgs = process.argv.slice(2)
if (myArgs[0] === '--test') {
    SpellDB.reset()
}

app.use(cors())

let corsOptions = {
    origin : ['http://localhost:3000'],
 }

// Tell Express to parse the body as JSON.
// (This is a different format than data sent by an HTML form.)
app.use(express.json());

// This sets a CORS header.  It allows requests from JS 
// that didn't originate here
// !!!!! Don't ever use "*" in production!!!
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Headers", "content-type")
    res.setHeader("Access-Control-Allow-Methods", "POST")
    next();
});

// Respond to preflight
//
// (This code isn't necessary. The "use" block above 
// actually produces all the necessary CORS responses.
// I include this block here simply to demonstrate 
// the preflight.
app.options('/spells', (req, res) => {
    console.log('Received options from preflight')
    console.log(req.headers)
    res.send()
})

if (myArgs[0] === '--test') {
    app.get('/reset', (req, res) => {
        SpellDB.reset();
        res.send('reset')
    })
}

app.get('/init', (req, res) => {
    require('./db/SqliteSpellDB').initialize()
    res.send('Initialized.')
})

app.get('/spells_search?', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    setTimeout(async () => res.json(await SpellDB.spellsearch(req.query)), delay)
})

app.get('/spells', async (req, res) => {
    // Introduce an artificial delay so user can see the effects of loading.    
    let delay = 500;  // default is 500. Can be overridden by query string.
    if (req.query.hasOwnProperty('delay')) {
        delay = req.query.delay;
        console.log("Using a delay of =>" + delay + "<=");
    }
    setTimeout(async () => res.json(await SpellDB.allSpells()), delay)
})

app.post('/spells', async (req, res) => {
    console.log("About to create a new spell");

    // With JSON data, req.body is the entire parsed JSON object
    console.log(req.body);
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        SpellDB.create(req.body).then((data) => {
            console.log("Sending:  ")
            console.log(data)
            res.json(data);
        })
    }
})

app.post('/spells/:id', async (req, res) => {
    let uniqId = req.params.id;
    console.log("About to modify spell with Id " + uniqId);
    console.log(req.body)

    // Using != instead of !== here because :id matches as a string, 
    // while the body (parsed from JSON) will be a Number.
    if (uniqId != req.body.id) {
        res.status(500)
        res.send({message: "Problem with request format:  Id is inconsistent."})
        return;
    }

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Post request was unable to parse data' })
    } else {
        SpellDB.update(req.body).then((data) => {
            res.json(data);
        })
    }
})

app.delete('/spells/:id', async (req, res) => {
    let uniqId = req.params.id;
    console.log("About to delete spell with primary key " + uniqId);
    console.log(req.body)

    if (uniqId != req.body.id) {
        res.status(500)
        res.send({message: "Problem with request format:  Id is inconsistent."})
        return;
    }

    // With JSON data, req.body is the entire parsed JSON object
    if (req.body == undefined) {
        console.log("Failed to parse body")
        res.status(500)
        res.send({ message: 'Delete request was unable to parse data' })
    } else {
        SpellDB.delete(req.body).then((data) => {
            res.json(data);
        })
    }
})

/* Launch the server */
app.listen(port, () => console.log(`Example app listening on port ${port}!`))