const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const User = require('../../models/User')
const UserToBe = require('../../models/UserToBe')
const ERRORS = require('../../errors/')
const bcrypt = require('bcrypt')
const ensureConnected = require('../../common/ensureConnected')
// const sendmail = require('./_sendMail.js')
const mailconf = require('../../config/email')







async function register(ctx, next) {
    if ( !await ensureConnected() ) {
        ctx.body = Object.assign({success: false}, ERRORS.SERVER_ERR)
        return await next()
    }
    
    let {email, username, password, confirmUrl} = ctx.request.body || {}
    let user = new User({email, username, password})
    let userToBe = new UserToBe({email, username, password})

    if ( !confirmUrl ) {
        ctx.body = Object.assign({success: false}, ERRORS.LACK_PARAMS)
        return await next();
    }

    if ( !email || !password ) {
        ctx.body = Object.assign({success: false}, ERRORS.LACK_PARAMS)
        return await next();
    }

    if ( user.emailFmtErr() ) {
        ctx.body = Object.assign({success: false}, ERRORS.EMAIL_FMT_ERR)
        return await next();
    }

    if ( await user.emailInuse() || await userToBe.emailInuse() ) {
        ctx.body = Object.assign({success: false}, ERRORS.EMAIL_INUSE)
        return await next();
    }

    if ( username ) {
        if ( user.unameLenErr() ) {
            ctx.body = Object.assign({success: false}, ERRORS.UNAME_LEN_ERR)
            return await next();
        }

        if ( user.unameFmtErr() ) {
            ctx.body = Object.assign({success: false}, ERRORS.UNAME_FMT_ERR)
            return await next();
        }

        if ( await user.unameInuse() || await userToBe.unameInuse() ) {
            ctx.body = Object.assign({success: false}, ERRORS.UNAME_INUSE)
            return await next();
        }

    }

    let round = Math.floor(Math.random()*4 + 6)
    userToBe.salt = bcrypt.genSaltSync(round)
    userToBe.password = bcrypt.hashSync(password, userToBe.salt)
    userToBe.confirmId = bcrypt.genSaltSync(round)

    userToBe = await userToBe.save();
    if ( userToBe ) {
        let messenger = mailconf.messenger;
        let msgpath = path.resolve(__dirname, 'messengers', mailconf.messenger + '.js');
        let sendmail = require(msgpath);
        let result = await sendmail(ctx, userToBe, mailconf);
        if ( result.err ) {
            userToBe.remove(); // if fail to send email, remove usertobe
            ctx.body = Object.assign({success: false}, ERRORS.SEND_EMAIL_ERR);
        } else {
            ctx.body = Object.assign({success: true}, ERRORS.SUCC);
        }
        
    } else {
        ctx.body = Object.assign({success: false}, ERRORS.FAIL);
    }
    return await next()
}

module.exports = register