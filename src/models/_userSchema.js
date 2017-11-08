module.exports = {
    email: {
        required: true,
        type: String,
        minLength: 6,
        maxLength: 50
    },

    password: {
        type: String,
        required: true
    },
    
    isSuper: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    username: {
        type: String,
        minLength: 6,
        maxLength: 30
    },


    salt: {
        type: String,
        required: true
    }


}


