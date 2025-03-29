// Name: Phuc Le

var sqlite3 = require('sqlite3').verbose()
let Spell = require('../models/Spell')


class SqliteSpellDB {
    static reset() {
        console.log('Resetting DB')
        SqliteSpellDB.db = new sqlite3.Database(__dirname + 'spells.sqlite')
        this.db.run("DROP TABLE Spells");
        SqliteSpellDB.initialize();
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
        })
    }

    static allSpells() {
        return new Promise((resolve, _reject) => {
            this.db.all('SELECT * from Spells', (err, response) => {
                //console.log('Select all')
                //console.log(err)
                console.log(response)
                resolve(response.map((item) => new Spell(item)))
            })
        })
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Spells where id="${Number(id)}";`, (err, rows) => {
                if (rows.length >= 1) {
                    resolve(new Spell(rows[0]))
                } else {
                    reject(`Id ${id} not found`)
                }
            })
        })
    }

    static create(description) {
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

    static update(spell) {
        let updatedSpell = new Spell(spell)
        if (updatedSpell.isValid()) {
            return new Promise((resolve, _reject) => {
                this.db.run(`UPDATE Spells SET name="${spell.name}", description="${spell.description}", spell_school="${spell.spell_school}", action_type="${spell.action_type}", effect_magnitude="${spell.effect_magnitude}", effect_area="${spell.effect_area}", effect_range="${spell.effect_range}", effect_count="${spell.effect_count}", effect_duration="${spell.effect_duration}", spell_cost="${spell.spell_cost}", spell_resource="${spell.spell_resource}", source_name="${spell.source_name}", source_link="${spell.source_link}", public_status="${spell.public_status}", modifiable="${spell.modifiable}" where id="${spell.id}"`)
                resolve(spell)
            })
        }
    }

    static delete(spell) {
        return new Promise((resolve, _reject) => {
            this.db.run(`DELETE FROM Spells where id="${spell.id}"`)
            resolve(spell)
        })
    }
}

SqliteSpellDB.db = new sqlite3.Database(__dirname + 'spells.sqlite')
module.exports = SqliteSpellDB