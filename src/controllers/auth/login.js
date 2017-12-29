const ensureConnected = require('../../common/ensureConnected')
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const token = require('../../common/token')
const _ = require('lodash')
const ERRORS = require('../../errors/')


async function login(ctx, next) {
    if ( !await ensureConnected() ) {
        ctx.body = Object.assign({success: false}, ERRORS.SERVER_ERR)
        return await next()
    }

    let {username, email, password} = ctx.request.body || {}

    if ( !password ) {
        ctx.body = Object.assign({success: false}, ERRORS.LACK_OF_PASS)
        return await next()
    }
    if ( !username && !email ) {
        ctx.body = Object.assign({success: false}, ERRORS.LACK_PARAMS)
        return await next()
    }

    let user = await User.findOne()
                        .or([{username}, {email}]).exec()

    if ( !user ) {
        ctx.body = Object.assign({success: false}, ERRORS.USER_NOT_EXIST)
        return await next()
    }

    if ( bcrypt.compareSync(password, user.password) ) {
        user = await user.getCookieObj();
        let tk = token.setPayload(ctx, user)
        ctx.body = Object.assign({success: true, token: tk}, ERRORS.SUCC)
    } else {
        ctx.body = Object.assign({success: true}, ERRORS.WRONG_PASS)
    }

    return await next();

}

module.exports = login;