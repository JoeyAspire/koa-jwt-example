const mongoose = require('mongoose')
const usertobeConf = require('../config/usertobe.js')

let schema = require('./_userSchema')

schema = Object.assign(schema, {
    createdAt: {
        type: Date,
        default: Date.now,
        expires: usertobeConf.expires
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