const mongoose = require('mongoose')
const User = require('../../models/User')
const UserToBe = require('../../models/UserToBe')
const ERRORS = require('../../errors/')
const ensureConnected = require('../../common/ensureConnected')
const schema = require('../../models/_userSchema')
const _ = require('lodash')



let props = []

for( let p in schema ) {
    props.push(p)
    props[p] = 1
}

async function confirm(ctx, next) {
    
    if ( !await ensureConnected() ) {
        ctx.body = Object.assign({success: false}, ERRORS.SERVER_ERR)
        return await next()
    }

    let req = ctx.request
    let confirmId = (req.query && req.query.confirmId)
        || (req.body && req.body.confirmId)
    
    
    let user = await UserToBe.findOne({confirmId: confirmId})
                            .select(props).exec()

    if ( !user ) {
        ctx.body = Object.assign({success: false}, ERRORS.CONFIRM_CODE_EXPIRED)
        return await next()
    }

    user = _.pick(user, props)
    user = new User(user)
    user = await user.save()
    if ( user && !user.errors ) {
        ctx.body = Object.assign({success: true}, ERRORS.SUCC)
    } else {
        ctx.body = Object.assign({success: false}, ERRORS.FAIL)
    }

    return await next();
    

}

module.exports = confirm;