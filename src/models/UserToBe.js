const mongoose = require('mongoose')
let schema = require('./_userSchema')

schema = Object.assign(schema, {
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 24*60*60
    },

    confirmId: {
        type: String
    }
})

const UserToBeSchema = mongoose.Schema(schema)


let methods = UserToBeSchema.methods
methods.emailInuse = async function() {
    return !!await this.model('UserToBe')
        .count({email: this.email})
        .exec()
}


methods.unameInuse = async function() {
    return !!await this.model('UserToBe')
        .count({username: this.username})
        .exec()
}


const UserToBe = mongoose.model('UserToBe', UserToBeSchema)
module.exports = UserToBe