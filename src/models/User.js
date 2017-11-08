const mongoose = require('mongoose')
const connection = mongoose.connection;



let schema = require('./_userSchema')
let UserSchema = mongoose.Schema(schema);



let methods = UserSchema.methods;


methods.emailFmtErr = function() {
    return this.email.indexOf('@') < 0;
}

methods.emailInuse = async function() {
    return !!await this.model('User').count({email: this.email}).exec();
}

methods.unameLenErr = function() {
    return this.username.length < 6 || this.username.length > 30;
}

methods.unameFmtErr = function() {
    return /[^0-9a-zA-Z_.-]+/.test(this.username)
}

methods.unameInuse = async function() {
    return await this.model('User').count({username: this.username}).exec();
}



let User = mongoose.model('User', UserSchema)


module.exports = User;