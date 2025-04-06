// Name: Phuc Le

class CollectionModel {
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

module.exports = CollectionModel