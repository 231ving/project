// Name: Phuc Le

class User {
    constructor(description) {
        if (description.id) {
            this.id = Number(description.id)
        } else {
            this.id = 0
        }
        if (description.email) {
            this.email = description.email
        } else {
            this.email = ""
        }
        if (description.username) {
            this.username = description.username
        } else {
            this.username = ''
        }
        if (description.password) {
            this.password = description.password
        } else {
            this.password = ''
        }
        if (description.admin) {
            this.admin = Number(description.admin)
        } else {
            this.admin = 0
        }
        this.errors = []
    }

    isValid() {
        this.errors = []
        if (!this.email || this.email <= 0) {
            this.errors.push('The account must have an email.')
        }
        if (!this.username || this.username.length <= 0) {
            this.errors.push('The account must have an username.')
        }
        if (!this.password || this.password.length <= 0) {
            this.errors.push('The account must have a password.')
        }
        if (this.admin !== 0 && this.admin !== 1) {
            this.errors.push('The admin status must be a 0 (for false) or 1 (for true).')
        }
        return this.errors.length <= 0
    }
}

module.exports = User