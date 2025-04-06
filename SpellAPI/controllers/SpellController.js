// Name: Phuc Le

const Spell = require('../models/Spell')
const DB = require('../db/SqliteDB')

class SpellController {
    index(req, res) {
        DB.allSpells().then((arrayOfSpells) => {
            res.render('spellIndex', { spells: arrayOfSpells, history: req.cookies['visit_history']['spell_history'], names: req.cookies['visit_history']['spell_names'] })
        })
    }

    show(req, res) {
        let id = req.params.id
        DB.find(id).catch( (_error) => {
            res.send('Could not find spell with id of ' + id)
        }).then( (spell) => {
            if (spell != undefined) {
                const new_history = Array(`/spells/${spell.id}`);
                req.cookies['visit_history']['spell_history'].forEach(element => {
                    new_history.push(element)
                });
                if (new_history.length > 3) {
                    new_history.pop()
                }
                res.cookie('visit_history', { spell_history: new_history})
                res.render('spellShow', { spell: spell })
            }
        })
    }

    newSpell(req, res) {
        res.render('spellNew', { spell: new Spell() })
    }

    create(req, res) {
        console.log('About to create spell')
        console.log(req.body)
        let testSpell = new Spell(req.body.spell)
            if (!testSpell.isValid()) {
                res.render('spellNew', { spell: testSpell })
                return;
            }
        DB.create(req.body.spell).then( (newSpell) => {
            if (newSpell.isValid()) {
                // Send a redirect to the "show" route for the new spell.
                res.writeHead(302, { 'Location': `/spells/${newSpell.id}` })
                res.end()
            } else {
                res.render('spellNew', { spell: newSpell })
            }
        })
    }

    edit(req, res) {
        let id = req.params.id
        DB.find(id).then((spell) => {
            if (!spell) {
                res.send('Could not find spell with id of ' + id)
            } else {
                res.render('spellEdit', { spell: spell })
            }   
        })
    }

    delete(req, res) {
        let id = req.params.id
        DB.find(id).then( (spell) => {
            if (spell) {
                DB.delete(spell)
                res.writeHead(302, { 'Location': `/spells` })
                res.end()
            }
            else {
                res.send('Could not find spell with id of ' + id)
            }
        })
    }

    update(req, res) {
        let id = req.params.id
        DB.find(id).then( (spell) => {
            let testSpell = new Spell(req.body.spell)
            if (!testSpell.isValid()) {
                testSpell.id = spell.id
                res.render('spellEdit', { spell: testSpell })
                return;
            }
    
            if (!spell) {
                res.send('Could not find spell with id of ' + id)
            } else {
                spell.id = id
                spell.name = req.body.spell.name
                spell.description = req.body.spell.description
                spell.spell_school = req.body.spell.spell_school
                spell.action_type = req.body.spell.action_type
                spell.effect_magnitude = Number(req.body.spell.effect_magnitude)
                spell.effect_area = Number(req.body.spell.effect_area)
                spell.effect_range = Number(req.body.spell.effect_range)
                spell.effect_count = Number(req.body.spell.effect_count)
                spell.effect_duration = Number(req.body.spell.effect_duration)
                spell.spell_cost = Number(req.body.spell.spell_cost)
                spell.spell_resource = req.body.spell.spell_resource
                spell.source_name = req.body.spell.source_name
                spell.source_link = req.body.spell.source_link
                spell.public_status = req.body.spell.public_status
                spell.modifiable = req.body.spell.modifiable
                console.log('About to call update')
                DB.update(spell)

                // Send a redirect to the "show" route for the new spell.
                res.writeHead(302, { 'Location': `/spells/${spell.id}` })
                res.end()
            }
        })
    }

    rawIndex(req, res) {
        DB.allSpells().then((spells) => res.send(spells))
        res.send(spells)
    }
}

module.exports = SpellController
