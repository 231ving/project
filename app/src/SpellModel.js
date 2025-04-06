// Name: Phuc Le

class SpellModel {
    constructor(description) {
        if (description.id) {
            this.id = Number(description.id)
        } else {
            this.id = 0
        }
        if (description.name) {
            this.name = description.name
        } else {
            this.name = ''
        }
        if (description.description) {
            this.description = description.description
        } else {
            this.description = ''
        }
        if (description.spell_school) {
            this.spell_school = description.spell_school
        } else {
            this.spell_school = ''
        }
        if (description.action_type) {
            this.action_type = description.action_type
        } else {
            this.action_type = ''
        }
        if (description.effect_magnitude) {
            this.effect_magnitude = Number(description.effect_magnitude)
        } else {
            this.effect_magnitude = 0
        }
        if (description.effect_area) {
            this.effect_area = Number(description.effect_area)
        } else {
            this.effect_area = 0
        }
        if (description.effect_range) {
            this.effect_range = Number(description.effect_range)
        } else {
            this.effect_range = 0
        }
        if (description.effect_count) {
            this.effect_count = Number(description.effect_count)
        } else {
            this.effect_count = 0
        }
        if (description.effect_duration) {
            this.effect_duration = Number(description.effect_duration)
        } else {
            this.effect_duration = 0
        }
        if (description.spell_cost) {
            this.spell_cost = Number(description.spell_cost)
        } else {
            this.spell_cost = 0
        }
        if (description.spell_resource) {
            this.spell_resource = description.spell_resource
        } else {
            this.spell_resource = ''
        }
        if (description.source_name) {
            this.source_name = description.source_name
        } else {
            this.source_name = ''
        }
        if (description.source_link) {
            this.source_link = description.source_link
        } else {
            this.source_link = ''
        }
        if (description.public_status) {
            this.public_status = Number(description.public_status)
        } else {
            this.public_status = 0
        }
        if (description.modifiable) {
            this.modifiable = Number(description.modifiable)
        } else {
            this.modifiable = 0
        }
        this.errors = []
    }

    isValid() {
        this.errors = []
        if (!this.name || this.name.length <= 2) {
            this.errors.push('The name must contain at least three characters')
        }
        if (!this.description || this.description.length <= 0) {
            this.errors.push('The spell must have a description.')
        }
        if (!this.spell_school || this.spell_school.length <= 0) {
            this.errors.push('The spell must have a Magic School it belongs to.')
        }
        if (!this.action_type || this.action_type.length <= 0) {
            this.errors.push('The spell must have an Action Type.')
        }
        if (this.effect_magnitude === 0) {
            this.errors.push('The spell must have a non-zero effect magnitude.')
        }
        if (this.effect_area < 0) {
            this.errors.push('The spell effect area must be at least 0.')
        }
        if (this.effect_range < 0) {
            this.errors.push('The spell range must be at least 0.')
        }
        if (this.effect_count <= 0) {
            this.errors.push('The spell must have a positive effect count.')
        }
        if (this.effect_duration < 0) {
            this.errors.push('The spell effect duration must be at least 0.')
        }
        if (this.spell_cost === 0) {
            this.errors.push('The spell cost must be a non-zero number.')
        }
        if (!this.spell_resource || this.spell_resource.length <= 0) {
            this.errors.push('The spell must have an Spell Resource.')
        }
        if (!this.source_name || this.source_name.length <= 0) {
            this.errors.push('The spell must have an Source name.')
        }
        if (this.public_status !== 0 && this.public_status !== 1) {
            this.errors.push('The spell public status must be a 0 (for false) or 1 (for true).')
        }
        if (this.modifiable !== 0 && this.modifiable !== 1) {
            this.errors.push('The modifiable status must be a 0 (for false) or 1 (for true).')
        }
        return this.errors.length <= 0
    }
}

module.exports = SpellModel