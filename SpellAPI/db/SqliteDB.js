// Name: Phuc Le

var sqlite3 = require('sqlite3').verbose()
let Spell = require('../models/Spell')
let Collection = require('../models/CollectionModel')
let User = require('../models/User')

class SqliteDB {
    static reset() {
        console.log('Resetting DB')
        SqliteDB.db = new sqlite3.Database(__dirname + 'spells.sqlite')
        this.db.run("DROP TABLE Spells");
        this.db.run("DROP TABLE Collections");
        this.db.run("DROP TABLE Connection");
        this.db.run("DROP TABLE Users");
        SqliteDB.initialize();
    }

    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE Spells (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, spell_school TEXT NOT NULL, action_type TEXT NOT NULL, effect_magnitude REAL NOT NULL, effect_area REAL NOT NULL, effect_range REAL NOT NULL, effect_count INT NOT NULL, effect_duration INT NOT NULL, spell_cost REAL NOT NULL, spell_resource TEXT NOT NULL, source_name TEXT NOT NULL, source_link TEXT, public_status INTEGER NOT NULL, modifiable INTEGER NOT NULL);')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Ice Bolt", "Fire a sharp spike of ice.", "Ice Magic", "Reaction", 10, 1, 5, 3, 0, 20, "Mana", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Fireball", "Launch a ball of violent, explosive fire.", "Fire Magic", "Main Action", 50, 3, 10, 10, 0, 20, "Mana", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Magic Arrow", "Launch a bevy of magical projecticles.", "Fire Magic", "Main Action", 10, 0, 20, 5, 2, 20, "Mana", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Minor Heal", "Call down rejuvenating light to heal wounds.", "Holy Magic", "Reaction", 20, 1, 20, 5, 2, 35, "Divine Favor", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Life Drain", "Drain lifeforce with a touch.", "Death Magic", "Main Action", 100, 0, 0, 1, 2, 80, "Spirit", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Meteor Rain", "Call upon heavenly judgement.", "Legendary Magic", "Ritual", 1000, 100, 10000, 50, 10, 10000, "Mana", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Manathrust", "A bolt of raw magic.", "Arcane Magic", "Main Action", 20, 0, 10, 1, 0, 10, "Mana", "Tales of MajEyal", "https://te4.org/wiki/Manathrust_(talent)", 1, 1);')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Mana Orb", "Fire an orb of dense Mana.", "Destruction Magic", "Main Action", 10, 0, 10, 1, 0, 10, "Mana", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Mana Arrow", "Fire a sharp arrow of Mana.", "Destruction Magic", "Main Action", 20, 0, 20, 1, 0, 15, "Mana", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Mage Hand", "Summon a magical construct in the shape of a hand. It obeys your will.", "Conjuration Magic", "Main Action", 5, 0, 20, 1, 10, 20, "Mana", "Original Content", "None", 1, 1)')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Mana Draw", "The caster draws in ambient Mana to replenish their Mana reserves.", "Restoration Magic", "Main Action", 50, 10, 0, 1, 0, 10, "Mana", "Original Content", "None", 1, 1)')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Candlelight", "Create a floating orb to illuminate the darkness.", "Conjuration Magic", "Main Action", 20, 10, 0, 1, 10, 10, "Mana", "Original Content", "None", 1, 1)')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Oakflesh", "Alter your body to as durable as oak.", "Alteration Magic", "Main Action", 30, 0, 0, 1, 60, 50, "Mana", "Original Content", "None", 1, 1)')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Mana Vortices", "Create rampaging vortices of violent Mana to shred apart armies.", "Destruction Magic", "Main Action", 10000, 1000, 10000, 10, 100, 5000, "Mana", "Original Content", "None", 1, 1)')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Resurrect", "Returns life to the dead, if only for a time.", "Restoration Magic", "Main Action", 1000, 0, 5, 1, 100, 10000, "Mana", "Original Content", "None", 1, 1)')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Great Shift", "The pinnacle of teleportation magic, capable of transporting armies across entire nations", "Spatial Magic", "Main Action", 100000, 10000, 1000000, 1, 0, 8000, "Mana", "Original Content", "None", 1, 1)')
            this.db.run('INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("Word of Death", "A blasphemous spell stolen from the God of Death itself.", "Necromantic Magic", "reaction", 500, 0, 10, 1, 0, 50, "Mana", "Original Content", "None", 1, 1)')
        
            this.db.run('CREATE TABLE Collections (id INTEGER PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, source_name TEXT NOT NULL, source_link TEXT, public_status INTEGER NOT NULL, modifiable INTEGER NOT NULL);')
            this.db.run('INSERT INTO Collections (name, description, source_name, source_link, public_status, modifiable) VALUES ("Ice Magic", "Magic manipulating ice.", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Collections (name, description, source_name, source_link, public_status, modifiable) VALUES ("Elemental Magic", "Magic manipulating the base elements.", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Collections (name, description, source_name, source_link, public_status, modifiable) VALUES ("Holy Magic", "Divine magic that calls upon the gods.", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Collections (name, description, source_name, source_link, public_status, modifiable) VALUES ("Necromancy", "Necromantic magic that calls upon death.", "Original Content", "None", 1, 1);')
            this.db.run('INSERT INTO Collections (name, description, source_name, source_link, public_status, modifiable) VALUES ("Arcane Magic", "The magic of the Arcane. The foundation of all Apprentice spells.", "Original Content", "None", 1, 1);')
        
            this.db.run('CREATE TABLE Connection (spell_id INTEGER NOT NULL, collection_id INTEGER NOT NULL, PRIMARY KEY (spell_id, collection_id), FOREIGN KEY(spell_id) REFERENCES Spells(id) ON DELETE CASCADE, FOREIGN KEY(collection_id) REFERENCES Collection(id) ON DELETE CASCADE );')
            this.db.run('INSERT INTO Connection (spell_id, collection_id) VALUES (0, 1);')
            this.db.run('INSERT INTO Connection (spell_id, collection_id) VALUES (1, 1);')
            this.db.run('INSERT INTO Connection (spell_id, collection_id) VALUES (2, 1);')
            this.db.run('INSERT INTO Connection (spell_id, collection_id) VALUES (3, 2);')
            this.db.run('INSERT INTO Connection (spell_id, collection_id) VALUES (4, 2);')
            this.db.run('INSERT INTO Connection (spell_id, collection_id) VALUES (5, 2);')

            this.db.run('CREATE TABLE Users (id INTEGER PRIMARY KEY, email TEXT NOT NULL, username TEXT NOT NULL, password TEXT NOT NULL, admin INTEGER NOT NULL );')
            this.db.run('INSERT INTO Users (email, username, password, admin) VALUES ("test231@gmail.com", "231vingADMIN", "Admin231password!", 1);')
            this.db.run('INSERT INTO Users (email, username, password, admin) VALUES ("test123@gmail.com", "231vingUSER", "User231password!", 1);')
        })
    }

    static allSpells() {
        return new Promise((resolve, _reject) => {
            this.db.all('SELECT * from Spells', (err, response) => {
                //console.log('Select all')
                //console.log(err)
                //console.log(response)
                resolve(response.map((item) => new Spell(item)))
            })
        })
    }

    static allCollections() {
        return new Promise((resolve, _reject) => {
            this.db.all('SELECT * from Collections', (err, response) => {
                //console.log('Select all')
                //console.log(err)
                //console.log(response)
                resolve(response.map((item) => new Collection(item)))
            })
        })
    }

    static allUsers() {
        return new Promise((resolve, _reject) => {
            this.db.all('SELECT * from Users', (err, response) => {
                //console.log('Select all')
                //console.log(err)
                //console.log(response)
                resolve(response.map((item) => new User(item)))
            })
        })
    }

    static createSpell(description) {
        let newSpell = new Spell(description)
        if (newSpell.isValid()) {
            return new Promise((resolve, _reject) => {
                this.db.run(`INSERT INTO Spells (name, description, spell_school, action_type, effect_magnitude, effect_area, effect_range, effect_count, effect_duration, spell_cost, spell_resource, source_name, source_link, public_status, modifiable) VALUES ("${newSpell.name}", "${newSpell.description}", "${newSpell.spell_school}", "${newSpell.action_type}", "${newSpell.effect_magnitude}", "${newSpell.effect_area}", "${newSpell.effect_range}", "${newSpell.effect_count}", "${newSpell.effect_duration}", "${newSpell.spell_cost}", "${newSpell.spell_resource}", "${newSpell.source_name}", "${newSpell.source_link}", "${newSpell.public_status}", "${newSpell.modifiable}")`,
                    function(_err, _data) {
                        newSpell.id = this.lastID
                        resolve(newSpell)
                    })
                })
        } else {
            return new Promise((resolve, _reject) => {
                resolve(newSpell)
            })
        }
    }

    static createCollection(description) {
        let newCollection = new Collection(description)
        if (newCollection.isValid()) {
            return new Promise((resolve, _reject) => {
                this.db.run(`INSERT INTO Collections (name, description, source_name, source_link, public_status, modifiable) VALUES ("${newCollection.name}", "${newCollection.description}", "${newCollection.source_name}", "${newCollection.source_link}", "${newCollection.public_status}", "${newCollection.modifiable}")`,
                    function(_err, _data) {
                        newCollection.id = this.lastID
                        resolve(newCollection)
                    })
                })
        } else {
            return new Promise((resolve, _reject) => {
                resolve(newSpell)
            })
        }
    }

    static createUser(description) {
        let newUser = new User(description)
        if (newUser.isValid()) {
            return new Promise((resolve, _reject) => {
                this.db.run(`INSERT INTO Users (email, username, password, admin) VALUES ("${newUser.email}", "${newUser.username}", "${newUser.password}", "${newUser.admin}")`,
                    function(_err, _data) {
                        newUser.id = this.lastID
                        resolve(newUser)
                    })
                })
        } else {
            return new Promise((resolve, _reject) => {
                resolve(newUser)
            })
        }
    }

    static updateSpell(spell) {
        let updatedSpell = new Spell(spell)
        if (updatedSpell.isValid()) {
            return new Promise((resolve, _reject) => {
                this.db.run(`UPDATE Spells SET name="${spell.name}", description="${spell.description}", spell_school="${spell.spell_school}", action_type="${spell.action_type}", effect_magnitude="${spell.effect_magnitude}", effect_area="${spell.effect_area}", effect_range="${spell.effect_range}", effect_count="${spell.effect_count}", effect_duration="${spell.effect_duration}", spell_cost="${spell.spell_cost}", spell_resource="${spell.spell_resource}", source_name="${spell.source_name}", source_link="${spell.source_link}", public_status="${spell.public_status}", modifiable="${spell.modifiable}" where id="${spell.id}"`)
                resolve(spell)
            })
        }
    }

    static updateCollection(collection) {
        let updatedCollection = new Collection(collection)
        if (updatedCollection.isValid()) {
            return new Promise((resolve, _reject) => {
                this.db.run(`UPDATE Collections SET name="${collection.name}", description="${collection.description}", source_name="${collection.source_name}", source_link="${collection.source_link}", public_status="${collection.public_status}", modifiable="${collection.modifiable}" where id="${collection.id}"`)
                resolve(collection)
            })
        }
    }

    static updateUser(user) {
        let updatedUser = new User(user)
        if (updatedUser.isValid()) {
            return new Promise((resolve, _reject) => {
                this.db.run(`UPDATE Users SET email="${user.email}", username="${user.username}", password="${user.password}", admin="${user.admin}" where id="${user.id}"`)
                resolve(user)
            })
        }
    }

    static deleteSpell(spell) {
        //this.db.get('PRAGMA foreign_keys = ON');
        return new Promise((resolve, _reject) => {
            this.db.run(`DELETE FROM Spells where id="${spell.id}"`)
            resolve(spell)
        })
    }

    static deleteCollection(collection) {
        //this.db.get('PRAGMA foreign_keys = ON');
        return new Promise((resolve, _reject) => {
            this.db.run(`DELETE FROM Collections where id="${collection.id}"`)
            resolve(collection)
        })
    }

    static deleteUser(user) {
        return new Promise((resolve, _reject) => {
            this.db.run(`DELETE FROM Users where email="${user.email} AND id="${user.id}"`)
            resolve(user)
        })
    }

    static spellsearch(spell) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Spells where name LIKE "%${spell.name}%" AND description LIKE "%${spell.description}" AND spell_school LIKE "%${spell.spell_school}%" AND action_type LIKE "%${spell.action_type}%" AND effect_magnitude LIKE "%${spell.effect_magnitude}%" AND effect_area LIKE "%${spell.effect_area}%" AND effect_range LIKE "%${spell.effect_range}%" AND effect_count LIKE "%${spell.effect_count}%" AND effect_duration LIKE "%${spell.effect_duration}%" AND spell_cost LIKE "%${spell.spell_cost}%" AND spell_resource LIKE "%${spell.spell_resource}%" AND source_name LIKE "%${spell.source_name}%" AND source_link LIKE "%${spell.source_link}%" AND public_status LIKE "%${spell.public_status}%" AND modifiable LIKE "%${spell.modifiable}%";`, (err, rows) => {
                if (err) {
                    reject(`Problem finding spells: ${err}`)
                } else {
                    resolve(rows.map((row) => new Spell(row)))
                }
            })
        }).catch(problem => {
            console.log(problem)
            console.log(spell)
            return this.allSpells()
        })
    }

    static collectionsearch(collection) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Collections where name LIKE "%${collection.name}%" AND description LIKE "%${collection.description}" AND source_name LIKE "%${collection.source_name}%" AND source_link LIKE "%${collection.source_link}%" AND public_status LIKE "%${collection.public_status}%" AND modifiable LIKE "%${collection.modifiable}%";`, (err, rows) => {
                if (err) {
                    reject(`Problem finding collections: ${err}`)
                } else {
                    resolve(rows.map((row) => new Collection(row)))
                }
            })
        }).catch(problem => {
            console.log(problem)
            console.log(collection)
            return this.allCollections()
        })
    }

    static usersearch(user) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Users where id LIKE "%${user.id}" AND username LIKE "%${user.username}";`, (err, rows) => {
                if (err) {
                    reject(`Problem finding users: ${err}`)
                } else {
                    resolve(rows.map((row) => new User(row)))
                }
            })
        }).catch(problem => {
            console.log(problem)
            console.log(user)
            return this.allUsers()
        })
    }
}  

SqliteDB.db = new sqlite3.Database(__dirname + 'spells.sqlite')
module.exports = SqliteDB