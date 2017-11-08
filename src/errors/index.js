
let mapping = {


    //common use
    '000': {
        
        SUCC: {
            code: 0, desp: 'success'
        },
    
        FAIL: {
            code: 1,
            desp: 'failure'
        },

        UNKNOWN_ERR: {
            code: 2,
            desp: 'unknown error'
        },
        
        SERVER_ERR: {
            code: 3,
            desp: 'server error'
        },
    
        NEED_LOGIN: {
            code: 4,
            desp: 'not login yet'
        },
    
        LACK_PARAMS: {
            code: 5,
            desp: 'need necessary parameters'
        }

    },


    //authentication related
    '001': {

        LACK_OF_UNAME: {
            code: 1,
            desp: 'username needed'
        },
    
        LACK_OF_PASS: {
            code: 3,
            desp: 'password needed'
        },
    
        LACK_OF_EMAIL: {
            code: 5,
            desp: 'email address needed'
        },
    
        UNAME_FMT_ERR: {
            code: 7,
            desp: 'only 0-9,a-z,A-Z,-,_ and blank space( ) are allowed in username'
        },
    
        EMAIL_FMT_ERR: {
            code: 9,
            desp: 'email format error'
        },
    
        UNAME_LEN_ERR: {
            code: 11,
            desp: 'username should have 6-30 characters'
        },
    
        PASS_LEN_ERR: {
            code: 13,
            desp: 'password should have 6-30 characters'
        },
        
        UNAME_INUSE: {
            code: 15,
            desp: 'username used'
        },
        
        EMAIL_INUSE: {
            code: 17,
            desp: 'email used'
        },

        
        WRONG_PASS: {
            code: 19,
            desp: 'wrong password'
        },


        CONFIRM_CODE_EXPIRED: {
            code: 21,
            desp: 'confirmation code expired'
        },


        USER_NOT_EXIST: {
            code: 23,
            desp: 'uer not exist'
        }
    },

    //002 not used
    '002': {
    },


    //003 not used
    '003': {

    }
    
};


let errors = {};


for(let prefix in mapping) {
    let o = mapping[prefix];
    for(let errname in o ) {
        let oErr = errors[errname] = o[errname];
        oErr.name = errname;
        let code = oErr.code.toString();
        code = "0".repeat(3 - code.length) + code;
        oErr.code = prefix + code;
        errors[oErr.code] = oErr;
    }
}


module.exports = errors;